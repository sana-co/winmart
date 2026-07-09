import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router";
import { LogOut, Plus, RefreshCw, Trash2, Upload } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Textarea } from "../components/ui/textarea";
import {
  addProduct,
  deleteProduct,
  formatPrice,
  getAllProducts,
  isCurrentUserProductManager,
  updateProduct,
  uploadProductImage,
} from "../lib/products";
import { productCategories, type ProductCategory } from "../lib/product-categories";
import { getErrorMessage } from "../lib/error-message";
import { getSupabaseClient, type Product } from "../lib/supabase";

type FormState = {
  name: string;
  description: string;
  price: string;
  category: string;
  is_new_arrival: boolean;
  is_top_pick: boolean;
};

const initialForm: FormState = {
  name: "",
  description: "",
  price: "",
  category: "Ladies",
  is_new_arrival: true,
  is_top_pick: false,
};

export function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(true);
  const [isProductManager, setIsProductManager] = useState(false);
  const [sessionUserId, setSessionUserId] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<FormState>(initialForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [priceDrafts, setPriceDrafts] = useState<Record<string, string>>({});
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadProducts = async () => {
    setLoadingProducts(true);
    setError("");

    try {
      const items = await getAllProducts();
      setProducts(items);
      setPriceDrafts(Object.fromEntries(items.map((item) => [item.id, String(item.price)])));
    } catch (err) {
      setError(getErrorMessage(err, "Could not load products."));
    } finally {
      setLoadingProducts(false);
    }
  };

  const checkAccess = async (userId: string | null) => {
    setSessionUserId(userId);

    if (!userId) {
      setIsProductManager(false);
      setAuthLoading(false);
      return;
    }

    try {
      const allowed = await isCurrentUserProductManager(userId);
      setIsProductManager(allowed);
      if (allowed) {
        await loadProducts();
      }
    } catch (err) {
      setError(getErrorMessage(err, "Could not verify product manager access."));
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    let supabase: ReturnType<typeof getSupabaseClient>;

    try {
      supabase = getSupabaseClient();
    } catch (err) {
      setError(getErrorMessage(err, "Supabase is not configured."));
      setAuthLoading(false);
      return () => {
        mounted = false;
      };
    }

    supabase.auth.getSession().then(({ data }) => {
      if (mounted) {
        checkAccess(data.session?.user.id ?? null);
      }
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setAuthLoading(true);
        checkAccess(session?.user.id ?? null);
      }
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setAuthLoading(true);
    setError("");
    setMessage("");

    try {
      const supabase = getSupabaseClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

      if (signInError) {
        throw signInError;
      }

      setMessage("Signed in successfully.");
    } catch (err) {
      setAuthLoading(false);
      setError(getErrorMessage(err, "Could not sign in."));
    }
  };

  const handleSignOut = async () => {
    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
    setProducts([]);
    setMessage("Signed out.");
  };

  const handleAddProduct = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      if (!imageFile) {
        throw new Error("Choose a product image before saving.");
      }

      const price = Number(form.price);
      if (!Number.isFinite(price) || price < 0) {
        throw new Error("Enter a valid product price.");
      }

      const imageUrl = await uploadProductImage(imageFile);
      const product = await addProduct({
        name: form.name.trim(),
        description: form.description.trim(),
        price,
        image_url: imageUrl,
        category: form.category,
        is_new_arrival: form.is_new_arrival,
        is_top_pick: form.is_top_pick,
      });

      setProducts((current) => [product, ...current]);
      setPriceDrafts((current) => ({ ...current, [product.id]: String(product.price) }));
      setForm(initialForm);
      setImageFile(null);
      setMessage("Product added successfully.");
    } catch (err) {
      setError(getErrorMessage(err, "Could not add product."));
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (id: string, payload: Parameters<typeof updateProduct>[1], success: string) => {
    setError("");
    setMessage("");

    try {
      const updated = await updateProduct(id, payload);
      setProducts((current) => current.map((product) => (product.id === id ? updated : product)));
      setPriceDrafts((current) => ({ ...current, [id]: String(updated.price) }));
      setMessage(success);
    } catch (err) {
      setError(getErrorMessage(err, "Could not update product."));
    }
  };

  const handlePriceSave = async (product: Product) => {
    const price = Number(priceDrafts[product.id]);

    if (!Number.isFinite(price) || price < 0) {
      setError("Enter a valid product price.");
      return;
    }

    await handleUpdate(product.id, { price }, "Price updated successfully.");
  };

  const handleDelete = async (product: Product) => {
    setError("");
    setMessage("");

    try {
      await deleteProduct(product.id);
      setProducts((current) => current.filter((item) => item.id !== product.id));
      setMessage("Product deleted successfully.");
    } catch (err) {
      setError(getErrorMessage(err, "Could not delete product."));
    }
  };

  if (authLoading) {
    return (
      <section className="min-h-[60vh] bg-[#f7f7f7] px-6 py-16">
        <div className="mx-auto max-w-[1100px] rounded-[8px] bg-white p-8 text-[#253A8F] shadow-sm">
          Checking product manager access...
        </div>
      </section>
    );
  }

  if (!sessionUserId) {
    return (
      <section className="min-h-[60vh] bg-[#f7f7f7] px-6 py-16">
        <form onSubmit={handleLogin} className="mx-auto max-w-[420px] rounded-[8px] border border-gray-100 bg-white p-6 shadow-sm">
          <h1 className="mb-2 text-2xl font-bold text-[#191919]">Product Manager Login</h1>
          <p className="mb-6 text-sm text-[#606779]">Sign in with your Supabase product manager account.</p>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email">Email</Label>
              <Input id="admin-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </div>
            {error && <p className="rounded-[8px] bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            {message && <p className="rounded-[8px] bg-green-50 p-3 text-sm text-green-700">{message}</p>}
            <Button type="submit" className="w-full bg-[#253A8F] hover:bg-[#1d2f75]">
              Sign In
            </Button>
          </div>
        </form>
      </section>
    );
  }

  if (!isProductManager) {
    return (
      <section className="min-h-[60vh] bg-[#f7f7f7] px-6 py-16">
        <div className="mx-auto max-w-[640px] rounded-[8px] border border-gray-100 bg-white p-6 shadow-sm">
          <h1 className="mb-2 text-2xl font-bold text-[#191919]">Access Restricted</h1>
          <p className="mb-6 text-sm text-[#606779]">Your account is signed in, but it has not been added as a Winmart product manager.</p>
          {error && <p className="mb-4 rounded-[8px] bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <Button type="button" onClick={handleSignOut} variant="outline">
            <LogOut /> Sign Out
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#f7f7f7] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#D9043D]">Shop Coordinator</p>
            <h1 className="text-3xl font-black text-[#191919]">Product Manager Portal</h1>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/admin">Admin Info Login</Link>
            </Button>
            <Button type="button" variant="outline" onClick={loadProducts} disabled={loadingProducts}>
              <RefreshCw /> Refresh
            </Button>
            <Button type="button" variant="outline" onClick={handleSignOut}>
              <LogOut /> Sign Out
            </Button>
          </div>
        </div>

        {(error || message) && (
          <div className="mb-6">
            {error && <p className="rounded-[8px] bg-red-50 p-4 text-sm text-red-700">{error}</p>}
            {message && <p className="rounded-[8px] bg-green-50 p-4 text-sm text-green-700">{message}</p>}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <form onSubmit={handleAddProduct} className="h-fit rounded-[8px] border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-[#191919]">Add Product</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product name</Label>
                <Input id="product-name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-description">Description</Label>
                <Textarea
                  id="product-description"
                  value={form.description}
                  onChange={(event) => setForm({ ...form, description: event.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="product-price">Price</Label>
                  <Input
                    id="product-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(event) => setForm({ ...form, price: event.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-category">Category</Label>
                  <Select
                    value={form.category}
                    onValueChange={(category: ProductCategory) => setForm({ ...form, category })}
                  >
                    <SelectTrigger id="product-category">
                      <SelectValue placeholder="Choose category" />
                    </SelectTrigger>
                    <SelectContent>
                      {productCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-image">Image upload</Label>
                <Input id="product-image" type="file" accept="image/*" onChange={(event) => setImageFile(event.target.files?.[0] ?? null)} required />
              </div>
              <div className="grid grid-cols-2 gap-3 rounded-[8px] bg-[#f7f7f7] p-3">
                <Label className="justify-between">
                  New Arrival
                  <Switch checked={form.is_new_arrival} onCheckedChange={(checked) => setForm({ ...form, is_new_arrival: checked })} />
                </Label>
                <Label className="justify-between">
                  Top Pick
                  <Switch checked={form.is_top_pick} onCheckedChange={(checked) => setForm({ ...form, is_top_pick: checked })} />
                </Label>
              </div>
              <Button type="submit" className="w-full bg-[#253A8F] hover:bg-[#1d2f75]" disabled={saving}>
                {saving ? <Upload /> : <Plus />} {saving ? "Saving..." : "Add Product"}
              </Button>
            </div>
          </form>

          <div className="rounded-[8px] border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#191919]">Existing Items</h2>
                <p className="text-sm text-[#606779]">{products.length} products</p>
              </div>
              {loadingProducts && <span className="text-sm text-[#253A8F]">Loading...</span>}
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>New</TableHead>
                  <TableHead>Top</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Delete</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex min-w-[240px] items-center gap-3">
                        <img src={product.image_url} alt={product.name} className="h-14 w-14 rounded-[8px] object-cover" />
                        <div>
                          <p className="font-semibold text-[#191919]">{product.name}</p>
                          <p className="max-w-[260px] truncate text-xs text-[#606779]">{product.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex min-w-[170px] items-center gap-2">
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={priceDrafts[product.id] ?? product.price}
                          onChange={(event) => setPriceDrafts({ ...priceDrafts, [product.id]: event.target.value })}
                          aria-label={`Price for ${product.name}`}
                        />
                        <Button type="button" size="sm" variant="outline" onClick={() => handlePriceSave(product)}>
                          Save
                        </Button>
                      </div>
                      <p className="mt-1 text-xs text-[#606779]">{formatPrice(product.price)}</p>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={product.is_new_arrival}
                        onCheckedChange={(checked) => handleUpdate(product.id, { is_new_arrival: checked }, "Product section updated.")}
                        aria-label={`Toggle new arrival for ${product.name}`}
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={product.is_top_pick}
                        onCheckedChange={(checked) => handleUpdate(product.id, { is_top_pick: checked }, "Product section updated.")}
                        aria-label={`Toggle top pick for ${product.name}`}
                      />
                    </TableCell>
                    <TableCell>{product.category || "Uncategorized"}</TableCell>
                    <TableCell className="text-right">
                      <Button type="button" variant="destructive" size="sm" onClick={() => handleDelete(product)}>
                        <Trash2 /> Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {!loadingProducts && products.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="py-10 text-center text-[#606779]">
                      No products have been added yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
}
