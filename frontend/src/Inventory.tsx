import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'
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

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axiosInstance.get('/inventory');
        // Based on your backend response structure, adjust as needed:
        // If the backend returns { message: string, items: InventoryItem[] }
        // then do:
        setInventory(response.data.items || []);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    };
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
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={handleSearch}
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

