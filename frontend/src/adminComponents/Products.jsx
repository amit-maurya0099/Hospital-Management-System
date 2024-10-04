import React from 'react'

const Products = () => {
  const medicines=[
    {
      "name": "Paracetamol",
      "price": "₹35",
      "stock": 100,
      "company": "Cipla",
      "expiry": "09/2025"
    },
    {
      "name": "Amoxicillin",
      "price": "₹60",
      "stock": 50,
      "company": "Sun Pharma",
      "expiry": "12/2024"
    },
    {
      "name": "Cetrizine",
      "price": "₹25",
      "stock": 200,
      "company": "Glenmark",
      "expiry": "05/2026"
    },
    {
      "name": "Metformin",
      "price": "₹45",
      "stock": 75,
      "company": "Torrent Pharmaceuticals",
      "expiry": "02/2026"
    },
    {
      "name": "Ibuprofen",
      "price": "₹40",
      "stock": 120,
      "company": "Lupin",
      "expiry": "07/2025"
    },
    {
      "name": "Aspirin",
      "price": "₹50",
      "stock": 80,
      "company": "Zydus Cadila",
      "expiry": "03/2027"
    },
    {
      "name": "Atorvastatin",
      "price": "₹90",
      "stock": 65,
      "company": "Dr. Reddy's Laboratories",
      "expiry": "11/2025"
    },
    {
      "name": "Omeprazole",
      "price": "₹70",
      "stock": 40,
      "company": "Biocon",
      "expiry": "04/2024"
    },
    {
      "name": "Losartan",
      "price": "₹55",
      "stock": 90,
      "company": "Intas Pharmaceuticals",
      "expiry": "10/2026"
    },
    {
      "name": "Lisinopril",
      "price": "₹65",
      "stock": 130,
      "company": "Glenmark",
      "expiry": "01/2025"
    },
    {
      "name": "Azithromycin",
      "price": "₹120",
      "stock": 30,
      "company": "Aurobindo Pharma",
      "expiry": "06/2025"
    },
    {
      "name": "Levothyroxine",
      "price": "₹35",
      "stock": 180,
      "company": "Cipla",
      "expiry": "02/2027"
    },
    {
      "name": "Simvastatin",
      "price": "₹85",
      "stock": 70,
      "company": "Zydus Cadila",
      "expiry": "09/2025"
    },
    {
      "name": "Pantoprazole",
      "price": "₹75",
      "stock": 150,
      "company": "Torrent Pharmaceuticals",
      "expiry": "12/2026"
    },
    {
      "name": "Clopidogrel",
      "price": "₹100",
      "stock": 45,
      "company": "Biocon",
      "expiry": "08/2024"
    },
    {
      "name": "Ranitidine",
      "price": "₹30",
      "stock": 160,
      "company": "Lupin",
      "expiry": "04/2026"
    },
    {
      "name": "Gabapentin",
      "price": "₹150",
      "stock": 20,
      "company": "Dr. Reddy's Laboratories",
      "expiry": "11/2027"
    },
    {
      "name": "Metoprolol",
      "price": "₹85",
      "stock": 60,
      "company": "Sun Pharma",
      "expiry": "05/2025"
    },
    {
      "name": "Furosemide",
      "price": "₹50",
      "stock": 110,
      "company": "Intas Pharmaceuticals",
      "expiry": "07/2026"
    },
    {
      "name": "Hydrochlorothiazide",
      "price": "₹40",
      "stock": 140,
      "company": "Aurobindo Pharma",
      "expiry": "01/2026"
    }
  ]
  
  
  return (
    <div className='w-screen h-screen bg-sky-300 bg-gradient-to-r from-white py-4  '>
      <h1 className='text-xl text-center font-bold underline '> Medicines Available</h1>
      <div className='mt-8'>
        <table className='w-full '>
          <thead className='font-semibold text-lg'>
            <th>Medicine Name</th>
            <th>Price(per Strip)</th>
            <th>Expiry</th>
            <th>Company</th>
            <th> Stock</th>
          </thead>
          <tbody>
            {medicines.map((medicine)=>(
              <tr className='text-center  '>
                <td>{medicine.name}</td>
                <td>{medicine.price}</td>
                <td>{medicine.expiry}</td>
                <td>{medicine.company}</td>
                <td>{medicine.stock}</td>
              </tr>
            ))}
             
            
          </tbody>
        </table>

      </div>
      
    </div>
  )
}

export default Products
