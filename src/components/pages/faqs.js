 import React from 'react';
import { Link, browserHistory } from 'react-router';
import $ from "jquery";
class AboutUs extends React.Component {
  redirectToLogin(event) {
    event.preventDefault();
    browserHistory.push({
        pathname: '/login',
        search: '',
        state: { previouspath:'/newin' }
       });
  }

    render(){
    
        
        return (
            <section className="about-sec content-sec p-b-50 m-t-50">{/*OPEN slider-sec */}
  <div className="container">
    <div className="about-sec-main">
      <h2 className="inner-title">FAQs</h2>
        
      <p><strong>Is</strong><strong> registration required before I can shop?</strong><br /> You can browse the shop and add to your trolley before you've registered with us. <br /> However, we recommend registering first so we can check if we deliver to your postcode. When you've registered, try booking a delivery slot before you start shopping. That way, you'll see exactly which products will be available for your chosen slot.</p>
      <p><br /><strong>How can I check if you deliver in my area?</strong><br /> We recommend that you register with us to check. It only takes 30 seconds, and we'll let you know immediately if we deliver to your postcode. But you can also &lsquo;check by postcode&rsquo;.</p>
      <p><br /><strong>Why don't you deliver to my area?</strong><br /> We don't deliver to the whole of the UK yet, but we're constantly expanding our delivery areas so we may be soon. If you register with us we'll email you to let you know when we've reached your area.</p>
      <p><br /><strong>What is the minimum order value?</strong><br /><strong>T</strong>he minimum order value is just &pound;30.</p>
      <p><br /><strong>How much does delivery cost?</strong><br /> There are no delivery charges generally. In case of festive rush etc, some time slots might have a nominal delivery charge but generally delivery is free but Orders under 30 pounds will be charged a 5 pound delivery charge</p>
      <p><strong>What payment methods do you accept?</strong><br /> We accept all major credit and debit cards: Visa, MasterCard, Visa Delta, Visa Debit, American Express.</p>
      <p>&nbsp;</p>
      <p><strong>What happens if I miss a delivery?</strong><br /> If you're not at home when your delivery arrives, your driver will try to reach you by phone. If they fail to get hold of you, they'll leave a card letting you know what time they arrived, and asking you to contact us on 0203 8088 336 or the number provided on the card. Always make sure you contact us straight away. <br /> NOTE: If you do miss a delivery, we cannot guarantee that the driver will be able to return with your order on the same day.</p>
      <p><br /><strong>Can I book a delivery before I've placed an order?</strong><br /> Yes you can. We actually recommend booking your slot before you start shopping &ndash; that way you'll see what's in stock and available for your delivery. <br /> Please note: a reserved delivery slot expires after 60 minutes if you have not checked out. If your chosen delivery expires, you might need to reserve the slot again or possibly book a new one.</p>
      <p><br /><strong>I've already booked a delivery slot, why am I being asked to book another?</strong><br /> Delivery slots expire after 60 minutes if you have not checked out. If your chosen delivery has expired, you will need to reserve the slot again or possibly book a new one.</p>
      <p><br /><strong>How do I change a delivery?</strong><br /> Click on the 'Order' tab and find the order you wish to change. When your order details appear, select the 'Change delivery' link. You will then be able to choose your preferred delivery time and confirm it.</p>
      <p><br /><strong>How do I book a delivery?</strong><br /> It's simple: when you've logged in, just hit the 'Book a delivery' button on the home page of our website or app. <br /> We recommend booking a delivery first, so when you start shopping you'll see what's in stock and available for your delivery</p>
      <p><strong>Can I place my order over the phone?</strong><br /> Afraid not. We're an internet company, so all orders must be placed through our website or mobile apps.</p>
      <p><br /><strong>Where can I find my order details?</strong><br /> You'll find an 'Orders' tab in the toolbar when you sign in to your account. There's also a 'My orders' button in the 'Welcome back' box at the top of the page. Click on either of these to view existing and previous orders.</p>
      <p><br /><strong>How do I save my order as a shopping list?</strong><br /> Sign in and click on the 'Trolley' link at the top of the page. Once in 'Your trolley', you'll find a 'Copy trolley to list' link on the right-hand side of the page. Click on it, name the list, and then click the 'Create and add' button to save it. <br /> To view saved shopping lists, click on the 'Shopping Lists' tab when you sign in to your account.</p>
      <p><br /><strong>How do I know if I placed my order correctly?</strong><br /> When you've successfully completed an order, we'll show you an order confirmation page as well as sending you a confirmation email containing your order details.</p>
      <p><br /><strong>Can I change an order once it's been placed?</strong><br /> Of course, making changes to an order is easy. <br /> Using our website or app, find the order you want to change, then 'Edit' the order to make changes. You can add or remove products, and even change the delivery slot. <br /><br /><strong>Can I edit an order at any time?</strong><br /> You can edit an order as many times as you like until its 'cut-off time' &ndash; usually up to 24 hours before the delivery is due. <br /> To check the cut-off time for your order, go to the home screen on our website or app. We'll also send you a cut-off time reminder email and text message for upcoming orders.</p>
      <p><br /><strong>How do I cancel an order?</strong><br /> On our website or app, go to Orders. Find the order you wish to cancel, and select 'Cancel order'. <br /> You can edit or cancel orders right up to their cut-off time, which is usually the day before the delivery is due. If you need to cancel an order after its cut-off time, please call our Customer Service team on 0203 8088 336. <br /> Please note: if you cancel after the cut-off time, you may be charged for the perishable items in your order. <br /> As a consumer, you have certain legal rights regarding the return of goods that are faulty, damaged or not as described. Our refund policy does not affect your legal rights. Our returns policy is in accordance with statutory rights under the Consumer Contracts Regulations. For more information about these rights please contact your local authority Trading Standards Department, or Citizens Advice. You can also refer to the Which? website.</p>
      <p><br /><strong>What happens if I don't have time to finish my order?</strong><br /> Your reserved delivery slot will expire after 60 minutes if you have not checked out. If you need longer to complete your shop, simply check out your order and go back to edit it later. As long as it's before your cut-off time, you can make as many changes as you like.</p>
      <p><br /><strong>Can I reorder a previous shopping order</strong><strong>?</strong><br /> Yes, simply find the order you want to buy again on your Orders page. View the order, click 'Add all to trolley', then check out.</p>
      <p>&nbsp;</p>
      <p><strong>What is your returns policy for non-perishable products?</strong><br /> If you've changed your mind about a non-perishable item, you have up to 14 days after your delivery to contact us for a refund. Call us on 0203 8088 336 or email contact@ surreywhales.com. We'll go through your options with you and arrange for your refund and return. <br /> All we ask is that you return products in a re-saleable condition, with their original packaging and tags (if applicable). This means that if a product is sealed or has a hygiene seal, we ask that you do not remove this seal until you're sure you're keeping the item. When we get the item back from you will process your refund within 14 days. <br /> While we don't offer exchanges, you're more than welcome to reorder any refunded item on your next shopping with Surrey whales.</p>
      <p><br /><strong>What is your returns policy if there's something wrong with the product?</strong><br /> If you discover that there's something wrong with the product, such as a fault, damage or it's not as described, you have a couple of options to get a refund. <br /> If you've received an order in the last 48 hours, you can request a refund through our website or app. Simply select the 'Request refund' link from the Orders page and follow the instructions. <br /> If more than 48 hours have passed and you don't see the 'Request refund' link, please email us at contact@surreywhales.com or call us on 0203 8088 336; we'll be happy to help go through your refund options with you. <br /> As a consumer, you have certain legal rights regarding the return of goods that are faulty, damaged or not as described. Our refund policy does not affect your legal rights. Our returns policy is in accordance with statutory rights under the Consumer Contracts Regulations. For more information about these rights please contact your local authority Trading Standards Department, or Citizens Advice. You can also refer to the <a href="https://www.which.co.uk%2Fconsumer-rights%2Fadvice%2Fi-want-to-return-my-goods-what-are-my-rights&amp;pageId=33cc21062652636942e75019d4c630fa&amp;ad=79364%7C1323310%7C%7C&amp;ad=79364%7C1372240%7C%7C">Which? website</a>.</p>
      <p><br /><strong>What is your returns policy for perishable products?</strong><br /> If there are any perishable items in your delivery that you're not happy with, you can either hand them back to your driver &ndash; who'll take them off your bill &ndash; or give us a call on 0203 8088 336 to discuss your options. <br /> Unless there's something wrong with the item, unfortunately we can't offer a refund for any perishable items you change your mind about after your delivery. <br /> Our returns policy is in accordance with statutory rights under the Consumer Contracts Regulations.</p>
      <p><br /><strong>How can I get a refund for missing items?</strong><br /> If you've received an order in the last 48 hours, you can request a refund through our website or app. Simply select the 'Request refund' link from the Orders page and follow the instructions. <br /> If more than 48 hours have passed and you don't see the 'Request refund' link, please email us at contact@surreywhales.com or call us on 0203 8088 336; we'll be happy to help go through your refund options with you</p>
      <p><strong>How do I update my details?</strong><br /> All your personal details are held in your account settings. To edit your existing details, simply sign in and click on the 'Account settings' tab towards the top of the page. Then select the category you wish to add to or amend, completing the relevant fields on each page.</p>
      <p><br /><strong>Can I have my shopping delivered to a different address?</strong><br /> Of course &ndash; you can have your shopping delivered wherever you like, as long as the postcode is in our delivery area. <br /> Go to your Delivery address book to add a new address. If it's outside of our delivery area, we'll let you know when you check the postcode.</p>
      <p><br /><strong>How do I change my delivery details?</strong><br /> To change the delivery instructions for an address, simply edit an address in your Delivery address book. <br /> If you'd like to change the location details of an address, please delete it from your address book and add the address anew.</p>
      <p><br /><strong>What happens if I forget my password?</strong><br /> When you try to log in, select the Forgotten your password? link. Follow the instructions and we'll email you a secure link so you can reset your password. <br /><br /></p>

    </div>
  </div>
</section>

        );
    }
}




export default(AboutUs);