import React from 'react';

export default function Offer() {
  return (
    // <div className="card w-48 glass">
    //   <figure>
    //     <img src="/images/photo-1606107557195-0e29a4b5b4aa.jpg" alt="car!" />
    //   </figure>
    //   <div className="card-body h-2 item-center">
    //     <h2 className="card-title justify-center ">Life hack</h2>
    //   </div>
    // </div>

    <div className="card w-96 bg-primary text-white shadow-xl">
      <figure>
        <img src="/images/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          Shoes!
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
      </div>
    </div>
  );
}
