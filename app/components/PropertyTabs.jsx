"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PropertyTabs() {
  const [tab, setTab] = useState("buy");

  const tabs = [
    { id: "buy", label: "Buy" },
    { id: "rent", label: "Rent" },
    { id: "commercial", label: "Commercial" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Tabs */}
      <div className="flex justify-center mb-4">
        <div className="flex gap-10 px-6 py-2 rounded-full bg-black/20 backdrop-blur-md shadow-lg">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative pb-2 text-lg font-semibold ${
                tab === t.id
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {t.label}
              {tab === t.id && (
                <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-yellow-400 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Forms */}
      <div className="bg-black/20 backdrop-blur-md p-6 rounded-2xl shadow-2xl ui-lock">
        {tab === "buy" && <BuyForm />}
        {tab === "rent" && <RentForm />}
        {tab === "commercial" && <CommercialForm />}
      </div>
    </div>
  );
}

/* =========================
   BUY FORM (ACTIVE)
========================= */

function BuyForm() {
  const router = useRouter();

  const [city, setCity] = useState("");
  const [locality, setLocality] = useState("");
  const [unitType, setUnitType] = useState("Full House");
  const [bhk, setBhk] = useState("");
  const [status, setStatus] = useState("");
  const [newProject, setNewProject] = useState(false);

  const handleSearch = () => {
    if (!city || !locality) {
      alert("Please select city and locality");
      return;
    }

    const query = new URLSearchParams({
      type: "buy",
      city,
      locality,
      unitType,
      bhk,
      status,
      newProject,
    }).toString();

    router.push(`/properties?${query}`);
  };

  return (
    <div className="grid grid-cols-12 gap-3">
      <select className="input col-span-3" value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="">Select City</option>
        <option>Bangalore</option>
        <option>Mumbai</option>
        <option>Delhi NCR</option>
        <option>Pune</option>
      </select>

      <input
        className="input col-span-6"
        placeholder="Search upto 3 localities or landmarks"
        value={locality}
        onChange={(e) => setLocality(e.target.value)}
      />

      <button
        onClick={handleSearch}
        className="col-span-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 flex items-center justify-center gap-2"
      >
        🔍 Search
      </button>

      <div className="col-span-4 flex gap-4 text-white">
        <label><input type="radio" checked={unitType === "Full House"} onChange={() => setUnitType("Full House")} /> Full House</label>
        <label><input type="radio" checked={unitType === "Land/Plot"} onChange={() => setUnitType("Land/Plot")} /> Land/Plot</label>
      </div>

      <select className="input col-span-4" value={bhk} onChange={(e) => setBhk(e.target.value)}>
        <option value="">BHK Type</option>
        <option>1 BHK</option>
        <option>2 BHK</option>
        <option>3 BHK</option>
        <option>4 BHK</option>
        <option>4+ BHK</option>
      </select>

      <select className="input col-span-3" value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Property Status</option>
        <option>Ready</option>
        <option>Under Construction</option>
      </select>

      <label className="col-span-1 flex items-center text-white text-sm gap-2">
        <input type="checkbox" checked={newProject} onChange={() => setNewProject(!newProject)} />
        New
      </label>
    </div>
  );
}

/* =========================
   RENT FORM (FIXED)
========================= */

function RentForm() {
  return (
    <div className="grid grid-cols-12 gap-3">
      <select className="input col-span-3">
        <option value="">Select City</option>
        <option>Bangalore</option>
        <option>Mumbai</option>
        <option>Delhi NCR</option>
        <option>Pune</option>
      </select>

      <input className="input col-span-6" placeholder="Search locality" />

      <button className="col-span-3 bg-yellow-400 text-black font-semibold rounded-lg flex items-center justify-center gap-2">
        🔍 Search
      </button>

      <div className="col-span-6 flex gap-4 text-white">
        <label><input type="radio" /> Full House</label>
        <label><input type="radio" /> PG/Hostel</label>
        <label><input type="radio" /> Flatmates</label>
      </div>

      <select className="input col-span-6">
        <option value="">BHK Type</option>
        <option>1 RK</option>
        <option>1 BHK</option>
        <option>2 BHK</option>
        <option>3 BHK</option>
        <option>4 BHK</option>
        <option>4+ BHK</option>
      </select>
    </div>
  );
}

/* =========================
   COMMERCIAL FORM (FIXED)
========================= */

function CommercialForm() {
  return (
    <div className="grid grid-cols-12 gap-3">
      <select className="input col-span-3">
        <option value="">Select City</option>
        <option>Bangalore</option>
        <option>Mumbai</option>
        <option>Delhi NCR</option>
        <option>Pune</option>
      </select>

      <input className="input col-span-6" placeholder="Search locality" />

      <button className="col-span-3 bg-yellow-400 text-black font-semibold rounded-lg flex items-center justify-center gap-2">
        🔍 Search
      </button>

      <div className="col-span-6 flex gap-4 text-white">
        <label><input type="radio" /> Rent</label>
        <label><input type="radio" /> Buy</label>
      </div>

      <select className="input col-span-6">
        <option value="">Property Type</option>
        <option>Office Space</option>
        <option>Co-Working</option>
        <option>Shop</option>
        <option>Showroom</option>
        <option>Industrial Building</option>
        <option>Industrial Shed</option>
        <option>Godown / Warehouse</option>
        <option>Other Business</option>
      </select>
    </div>
  );
}
