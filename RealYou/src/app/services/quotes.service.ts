import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  private quotes: string[] = [
    "You are capable of amazing things.",
    "Believe in yourself and all that you are.",
    "The best time for new beginnings is now.",
    "Stay positive, work hard, make it happen.",
    "Believe in your infinite potential.",
    "You are the best and you are doing great",
    "There is nothing you cannot do.",
    "You can achieve everything.",
    "You are doing great.",
    "Trust the process.",
    "Great things are on their way for you.",
    "The best is yet to come so dont give up.",
    "This universe is preparing good things for you, but you must embrace the journey.",
    "When you feel to quit remember the reason why you started.",
    "you are more stronger than you think.",
    "Great things take time. Be patient with yourself.",
    "Your journey is unfolding exactly as it should—keep going.",
    "Small steps every day lead to big changes over time.",
    "You have the strength to rise above anything trying to hold you back.",
    "Progress, not perfection—just show up for yourself.",
    "Every sunrise is a new chance to grow and glow.",
    "You didn't come this far just to come this far—keep moving.",
    "Your potential is limitless when you believe in your vision.",
    "Success begins the moment you decide not to give up.",
    "Hard work today leads to success tomorrow.",
    "The only limit you have is the one you place on yourself.",
    "You are capable of more than you know.",
    "Every setback is a setup for a comeback.",
    "Your journey may be tough, but so are you.",
    "Rise up, and keep going, even when it's hard.",
    "The universe has your back. Trust the timing of your life.",
    "Don't wait for opportunities, create them.",
    "You are not defined by your past, but by what you choose to become."
  ];

  getRandomQuote(): string {
    const randomIndex = Math.floor(Math.random() * this.quotes.length);
    return this.quotes[randomIndex];
  }
}
