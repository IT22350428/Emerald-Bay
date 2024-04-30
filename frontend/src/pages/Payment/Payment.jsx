/*import React, {useState, useEffect} from 'react'
import Navbar_customer from "../../components/Navbar_customer";
import { useAuthStore } from '../../store/useAuthStore';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from "../../utils/toast";

const Payment = () => {


    const { user } = useAuthStore(); 
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [items, setItems] = useState('');
    const [totalAmount, setTotalAmount] = useState('');


    useEffect(() => {
        const fetchProfileData = async () => {
          try {
            console.log('User ID:', user._id);
        
            if (!user || !user._id) {
              throw new Error('User ID not available');
            }
        
            const response = await fetch(`http://localhost:8000/customer/get/${user._id}`, {
              method: 'GET',
            });
        
            console.log('Response status:', response.status); // Log response status
        
            if (!response.ok) {
              throw new Error('Failed to fetch profile data');
            }
        
            const data = await response.json();
            console.log('Data from backend:', data); // Log data received from backend
            setProfileData(data.user); // Assuming the data structure has a 'user' property
            setIsLoading(false); // Set loading to false after data is fetched
          } catch (error) {
            console.error('Error fetching user profile:', error);
            setError(error.message);
            setIsLoading(false); // Set loading to false in case of error
          }
        };
    
        if (user) {
          fetchProfileData();
        }
      }, [user]);

      const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await fetch('http://localhost:8000/api/orders/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               
              customerid: profileData.customerId,
              customername: profileData.name,
              deliveryaddress: deliveryAddress,
              items: items,
              totalprice: parseFloat(totalAmount), // Ensure total price is a number
              
            }),
          });
      
          if (!response.ok) {
            throw new Error('Failed to create order');
          }
      
          const data = await response.json();
          console.log('Order created:', data);
          Toast({ type: "success", message: "Payment successfully" });
          
        } catch (error) {
          console.error('Error creating order:', error);
          Toast({ type: "error", message: error.message });
        }
      };
      

  return (
    <div>
        <Navbar_customer/>

        <div className="paymentform" style={{border:'1px solid black', width:'75%', marginLeft:'200px', padding:'30px'}}>
        <Form>
                <Form.Group className="mb-3" >
                    <Form.Label>Customer Id</Form.Label>
                    <Form.Control type="text" value={profileData.customerId} disabled/>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control type="text" value={profileData.name} disabled/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Delivery Address</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Items</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Total Amount</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Form>
        </div>
    </div>
  )
}

export default Payment*/

import React, { useState, useEffect } from 'react';
import Navbar_customer from '../../components/Navbar_customer';
import { useAuthStore } from '../../store/useAuthStore';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from '../../utils/toast';

const Payment = () => {
  const { user } = useAuthStore();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [items, setItems] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        console.log('User ID:', user._id);

        if (!user || !user._id) {
          throw new Error('User ID not available');
        }

        const response = await fetch(`http://localhost:8000/customer/get/${user._id}`, {
          method: 'GET',
        });

        console.log('Response status:', response.status); // Log response status

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        console.log('Data from backend:', data); // Log data received from backend
        setProfileData(data.user); // Assuming the data structure has a 'user' property
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError(error.message);
        setIsLoading(false); // Set loading to false in case of error
      }
    };

    if (user) {
      fetchProfileData();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerid: profileData?.customerId,
          customername: profileData?.name,
          deliveryaddress: deliveryAddress,
          items: items,
          totalprice: parseFloat(totalAmount), // Ensure total price is a number
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const data = await response.json();
      console.log('Order created:', data);
      Toast({ type: 'success', message: 'Payment successfully' });
    } catch (error) {
      console.error('Error creating order:', error);
      Toast({ type: 'error', message: error.message });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profileData) {
    return <div>No profile data available</div>;
  }

  return (
    <div>
      <Navbar_customer />

      <div className="paymentform" style={{ border: '1px solid black', width: '75%', marginLeft: '200px', padding: '30px' }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Customer Id</Form.Label>
            <Form.Control type="text" value={profileData.customerId} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control type="text" value={profileData.name} disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Delivery Address</Form.Label>
            <Form.Control type="text" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Items</Form.Label>
            <Form.Control type="text" value={items} onChange={(e) => setItems(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Total Amount</Form.Label>
            <Form.Control type="text" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Payment;