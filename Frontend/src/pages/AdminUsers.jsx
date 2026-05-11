import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AuthContext from "../context/AuthContext";
import apiClient from "../services/api";
import { 
  Users, Trash2, ShieldCheck, User as UserIcon, 
  ArrowLeft, Loader2, Calendar, Mail 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminUsers() {
  const { user: currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser?.role !== "admin") {
      navigate("/");
      return;
    }
    fetchUsers();
  }, [currentUser, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await apiClient.get("/admin/users");
      setUsers(response.data.data);
    } catch (error) {
      toast.error("Security breach: Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Danger: Are you sure you want to permanently delete this user?")) return;
    try {
      await apiClient.delete(`/admin/users/${userId}`);
      toast.success("User access revoked successfully.");
      fetchUsers();
    } catch (error) {
      toast.error("Operation failed: Could not delete user.");
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      await apiClient.patch(`/admin/users/${userId}/role`, { role: newRole });
      toast.success(`Access level updated to ${newRole}.`);
      fetchUsers();
    } catch (error) {
      toast.error("Protocol error: Failed to update role.");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-background text-secondary">
        <Loader2 className="h-10 w-10 animate-spin mb-4" />
        <p className="font-black uppercase tracking-widest text-[10px]">Accessing Secure Database...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck size={14} /> Admin Terminal
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-foreground leading-none">
              User <span className="text-secondary">Directory</span>
            </h1>
          </div>
          <Button 
            onClick={() => navigate("/admin")}
            variant="outline"
            className="rounded-xl border-border font-black uppercase tracking-widest text-[10px] h-12 px-6 hover:bg-muted transition-all"
          >
            <ArrowLeft size={14} className="mr-2" /> Back to Hub
          </Button>
        </div>

        {/* Users Table Card */}
        <div className="bg-white border border-border rounded-[2.5rem] shadow-2xl shadow-foreground/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-muted/30 border-b border-border">
                <tr>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-foreground/40">Traveler</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-foreground/40">Contact</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-foreground/40">Access Level</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-foreground/40">Registry Date</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-foreground/40 text-right">Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-black">
                          {u.name[0].toUpperCase()}
                        </div>
                        <span className="font-bold text-foreground">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground/60">
                        <Mail size={14} /> {u.email}
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <select
                        value={u.role}
                        onChange={(e) => handleChangeRole(u._id, e.target.value)}
                        className="bg-background border border-border rounded-lg px-3 py-2 text-xs font-black uppercase tracking-widest text-foreground focus:border-secondary outline-none transition-all cursor-pointer"
                      >
                        <option value="user">Traveler</option>
                        <option value="admin">Administrator</option>
                      </select>
                    </td>
                    <td className="px-8 py-5 text-sm font-medium text-foreground/40">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} /> {new Date(u.createdAt).toLocaleDateString("en-IN")}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        disabled={u._id === currentUser._id}
                        className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all disabled:opacity-20"
                        title="Delete User"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="text-center py-20">
              <Users size={48} className="mx-auto text-muted-foreground mb-4 opacity-20" />
              <p className="font-black uppercase tracking-widest text-[10px] text-foreground/40">No records found in database</p>
            </div>
          )}
        </div>

        {/* Info Footer */}
        <div className="flex items-center gap-2 justify-center opacity-30">
          <ShieldCheck size={12} />
          <span className="text-[9px] font-black uppercase tracking-[0.3em]">Total Registry: {users.length} Units</span>
        </div>
      </div>
    </div>
  );
}