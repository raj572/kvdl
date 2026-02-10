import { useEffect, useState } from "react";
import { getContacts } from "../../services/api";

const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = async () => {
        setLoading(true);
        try {
            const response = await getContacts();
            setContacts(response.success ? response.data : []);
        } catch (error) {
            console.error("Failed to load contacts", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <header className="mb-12 flex justify-between items-end">
                <div>
                    <p className="text-xs font-[arkhip] uppercase tracking-[0.35em] text-[#0a0a0a]/40">Inquiries</p>
                    <h2 className="text-4xl md:text-5xl font-[arkhip] text-[#0a0a0a] mt-2">Contact List</h2>
                </div>
                <button
                    onClick={loadContacts}
                    className="text-xs font-bold uppercase tracking-widest text-[#0a0a0a]/60 hover:text-primary transition-colors mb-2"
                >
                    Refresh Data
                </button>
            </header>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-[#0a0a0a]/5">
                {loading ? (
                    <div className="p-12 text-center text-[#0a0a0a]/40 uppercase tracking-widest text-sm">Loading...</div>
                ) : contacts.length === 0 ? (
                    <div className="p-12 text-center text-[#0a0a0a]/40 uppercase tracking-widest text-sm">No contacts found</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#1a1a1a] text-white">
                                <tr>
                                    <th className="p-6 text-xs font-bold uppercase tracking-widest opacity-60">Date</th>
                                    <th className="p-6 text-xs font-bold uppercase tracking-widest opacity-60">Name</th>
                                    <th className="p-6 text-xs font-bold uppercase tracking-widest opacity-60">Contact</th>
                                    <th className="p-6 text-xs font-bold uppercase tracking-widest opacity-60">Subject</th>
                                    <th className="p-6 text-xs font-bold uppercase tracking-widest opacity-60">Message</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#0a0a0a]/5">
                                {contacts.map(c => (
                                    <tr key={c.id} className="hover:bg-[#f8f0dd]/20 transition-colors">
                                        <td className="p-6 text-sm text-[#0a0a0a]/60 whitespace-nowrap">
                                            {new Date(c.created_at).toLocaleDateString()}
                                            <div className="text-[10px] opacity-50">{new Date(c.created_at).toLocaleTimeString()}</div>
                                        </td>
                                        <td className="p-6 font-bold text-[#0a0a0a]">{c.name}</td>
                                        <td className="p-6">
                                            <div className="text-sm font-bold">{c.email}</div>
                                            <div className="text-xs text-[#0a0a0a]/60 mt-1">{c.phone}</div>
                                        </td>
                                        <td className="p-6 text-sm">
                                            <span className="bg-[#0a0a0a]/5 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide">
                                                {c.query_type}
                                            </span>
                                            {c.property_type && (
                                                <div className="text-[10px] text-[#0a0a0a]/50 mt-1">Prop: {c.property_type}</div>
                                            )}
                                        </td>
                                        <td className="p-6 text-sm text-[#0a0a0a]/70 max-w-sm truncate" title={c.message}>
                                            {c.message}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminContacts;
