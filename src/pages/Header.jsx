import React from "react";
import { Clock, Shield, Star } from "lucide-react";
import '../styles/header.css'

export function Header() {
    return (
        <div className="container">
            <div className="header">
                <h1>Cover All Your Burial Costs and Unpaid Debts with This Final Allowance Benefit Worth $40,000!</h1>
                <div className="sub-text">
                    <div className="pulse"></div>
                    Emily is Here to Help You Save!
                </div>
            </div>

            <div className="features">
                <div className="feature">
                    <Shield className="icon" />
                    <span className="icon-title">Licensed Agents</span>
                </div>
                <div className="feature">
                    <Star className="icon" />
                    <span className="icon-title">4.9/5 Customer Rating</span>
                </div>
                <div className="feature">
                    <Clock className="icon" />
                    <span className="icon-title">2-Minute Process</span>
                </div>
            </div>
        </div>
    );
}
