import React, { useCallback, useEffect, useState } from 'react';
import {auth, fs} from '../firebase/index';
import logo from '../assets/commerce-logo.png';
import moment from "moment";

const Bill = (props) => {
    const {billID}= props.match.params;
    const {history} = props;
    const [order, setOrder] = useState("");

    const getOrderDetails = useCallback(() => {
        fs.collection('Orders').doc(billID).get().then(data => {
            setOrder(data.data());
        })
    },[billID])
    useEffect(() => {
        const subs = auth.onAuthStateChanged(user => {
            if(user){
                getOrderDetails();
            }else{
                history.push("/")
            }
        })
        return () => subs;
    },[history,getOrderDetails])
    return(
		<>
        <div className="invoice-box">
			<table cellPadding="0" cellSpacing="0">
				<tr className="top">
					<td colSpan="2">
						<table>
							<tr>
								<td className="title">
									<img alt="business-logo" src={logo} style={{width: '100%', maxWidth: '300px'}} />

								</td>

								<td>
									Invoice #: {order && order.invoiceNumber}<br />
									Date: {moment(order && order.date).format("dddd, MMMM Do YYYY")}<br />
									Time: {moment(order && order.date).format(" h:mm a")}
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr className="information">
					<td colSpan="4">
						<table>
							<tr>
								<td>
									Bill Project, Inc.<br />
									12345, Chandni Chowk Road<br />
									New Delhi, south XXXXX
								</td>

								<td>
									{order && order.name}<br />
									Contact:<br />
									+91 {order && order.phone}
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<table>
				<thead>
					<tr colSpan="8" className="heading">
						<td>Payment Method</td>
						<td>STATUS #</td>
					</tr>
				</thead>
				<tbody>
					<tr colSpan="8">
						<td>{order && order.payment}</td>
						<td>{order && order.status}</td>
					</tr>
				</tbody>
			</table>
			<table>
				<thead>
					<tr className="heading">
						<td>Product</td>
						<td>Price</td>
						<td align="right">Quantity</td>
						<td align="right">Total Price (₹)</td>
						<td align="right">SGST (₹)</td>
						<td align="right">CGST (₹)</td>
						<td align="right">Total Payable Amount (₹)</td>
					</tr>
				</thead>
				<tbody>
					{
						order &&
						order.products.map((product) => (
							<tr key={product.id}>
								<td>{product.title}</td>
								<td>₹{product.price.toFixed(2)}/-</td>
								<td align="right">{product.quantity}</td>
								<td align="right">₹{product.totalPrice.toFixed(2)}/-</td>
								<td align="right">₹{product.CGST.toFixed(2)}/- ({(product.tax/2)+"%"})</td>
								<td align="right">₹{product.SGST.toFixed(2)}/- ({(product.tax/2)+"%"})</td>
								<td align="right">₹{(product.SGST+product.CGST+product.totalPrice).toFixed(2)}/-</td>
							</tr>
						))
					}
				</tbody>
				<tfoot>
					<tr className="heading">
						<td colSpan="4"><b>Total:</b></td>
						<td colSpan="2" align="left">(Total Tax): ₹{order && order.totalTax.toFixed(2)}/-   </td>
						<td align="right">₹{order && order.totalPayable.toFixed(2)}/-</td>
					</tr>
				</tfoot>
			</table>
			<div style={{marginTop:"50px", display:'flex',flexDirection:'row', justifyContent:"space-between"}}>
					<div><u>customer sign.</u></div>
					<div><u>Merchant sign.</u></div>
			</div>
		</div>
		<div style={{textAlign:"center", margin:'20px'}}><button onClick={ () => {
                window.print()
            }}>PRINT BILL</button></div>
		</>
    )
}
export default Bill;