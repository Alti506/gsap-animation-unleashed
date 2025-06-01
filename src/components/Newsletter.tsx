
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 to-indigo-900">
      <div className="container mx-auto px-8">
        <Card className="max-w-2xl mx-auto bg-gray-900/80 border-purple-400 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              Stay Updated
            </CardTitle>
            <p className="text-gray-300 text-lg">
              Get the latest animation tutorials, tips, and resources delivered to your inbox
            </p>
          </CardHeader>
          <CardContent>
            {isSubscribed ? (
              <div className="text-center p-8">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">Thank You!</h3>
                <p className="text-gray-300">You've been successfully subscribed to our newsletter.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-purple-400"
                    required
                  />
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 px-8"
                  >
                    Subscribe
                  </Button>
                </div>
                <p className="text-gray-400 text-sm text-center">
                  Join 10,000+ developers and designers. Unsubscribe anytime.
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Newsletter;
