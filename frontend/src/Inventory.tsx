import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import axiosInstance from './axiosInstance';

interface InventoryItem {
  id: number;
  ingredientID: string;
  name: string;
  quantity: number;
  unitPrice: number;
  expirationDate: string;
}

const Inventory: React.FC = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [restockAmounts, setRestockAmounts] = useState<{ [key: string]: number }>({});

  // Fields for adding a new inventory item
  const [newName, setNewName] = useState('');
  const [newQuantity, setNewQuantity] = useState<number | ''>('');
  const [newUnitPrice, setNewUnitPrice] = useState<number | ''>('');

  const fetchInventory = async () => {
    try {
      const response = await axiosInstance.get('/inventory');
      setInventory(response.data.items || []);
    } catch (error) {
      console.error('Error fetching inventory data:', error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleRestockChange = (itemName: string, amount: number) => {
    setRestockAmounts((prevAmounts) => ({
      ...prevAmounts,
      [itemName]: amount,
    }));
  };

  const handleRestock = async (itemName: string) => {
    const item = inventory.find((inv) => inv.name === itemName);
    if (!item) return;
    const amount = restockAmounts[itemName] || 0;

    try {
      await axiosInstance.put(`/inventory/${item.id}`, {
        quantity: item.quantity + amount,
      });
      setInventory((prevInventory) =>
        prevInventory.map((invItem) =>
          invItem.name === itemName ? { ...invItem, quantity: invItem.quantity + amount } : invItem
        )
      );
      setRestockAmounts((prevAmounts) => ({ ...prevAmounts, [itemName]: 0 }));
    } catch (error) {
      console.error('Error updating inventory:', error);
    }
  };

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm)
  );

  const handleAddIngredient = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newName.trim() || newQuantity === '' || newUnitPrice === '') {
      alert('Please fill in all fields before adding the ingredient.');
      return;
    }

    try {
      await axiosInstance.post('/inventory', {
        name: newName,
        quantity: Number(newQuantity),
        unitPrice: Number(newUnitPrice)
      });

      // Reset fields
      setNewName('');
      setNewQuantity('');
      setNewUnitPrice('');

      // Refresh inventory
      fetchInventory();
    } catch (error) {
      console.error('Error adding inventory item:', error);
    }
  };

  return (
    <div id='wrapper'>
      <div className="inventory">
        <div id='return-button'>
          <button onClick={() => navigate('/launchpad')} className="back-button">
            ← Back to Launch Pad
          </button>
        </div>
        <div id='component'>
          <h2>Inventory</h2>
          {/* Add Inventory Ingredient Form */}
          <form onSubmit={handleAddIngredient} style={{ marginBottom: '20px' }}>
            <h3>Add New Ingredient</h3>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Quantity:</label>
              <input
                type="number"
                min="0"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value === '' ? '' : Number(e.target.value))}
                required
              />
            </div>
            <div>
              <label>Unit Price:</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={newUnitPrice}
                onChange={(e) => setNewUnitPrice(e.target.value === '' ? '' : Number(e.target.value))}
                required
              />
            </div>
            <button type="submit" id='general-button' style={{ marginTop: '10px' }}>
              Add Ingredient
            </button>
          </form>

          <input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={handleSearch}
            style={{ display: 'block', marginBottom: '10px' }}
          />

          <ul>
            {filteredInventory.map((item, index) => (
              <li key={index}>
                {item.name} - {item.quantity} units
                <input
                  type="number"
                  min="1"
                  placeholder="Amount"
                  value={restockAmounts[item.name] || ''}
                  onChange={(e) => handleRestockChange(item.name, Number(e.target.value))}
                  style={{ marginLeft: '10px', width: '80px' }}
                />
                <button id='general-button' onClick={() => handleRestock(item.name)}>Restock</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
