
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, Mail, Lock, TrendingUp, User } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };
    checkUser();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!isLogin) {
      if (!firstName || !lastName) {
        toast.error("Please fill in your first and last name");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("Invalid email or password");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Welcome back!");
          navigate("/dashboard");
        }
      } else {
        const redirectUrl = `${window.location.origin}/dashboard`;
        
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              first_name: firstName,
              last_name: lastName
            }
          }
        });

        if (error) {
          if (error.message.includes("User already registered")) {
            toast.error("An account with this email already exists. Try logging in instead.");
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success("Account created successfully! Please check your email to confirm your account.");
          setIsLogin(true);
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-6 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="text-white hover:bg-white/10 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md bg-white/5 border-white/10">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-400" />
                </div>
              </div>
              <CardTitle className="text-2xl text-white">
                {isLogin ? "Welcome Back" : "Create Account"}
              </CardTitle>
              <CardDescription className="text-slate-400">
                {isLogin 
                  ? "Sign in to access your stock predictions" 
                  : "Join us to start predicting stock prices"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAuth} className="space-y-4">
                {!isLogin && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-white">First Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                            required={!isLogin}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-white">Last Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                            required={!isLogin}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                      minLength={6}
                      required
                    />
                  </div>
                </div>

                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                        minLength={6}
                        required
                      />
                    </div>
                  </div>
                )}
                
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={loading}
                >
                  {loading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-slate-400">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </p>
                <Button
                  variant="link"
                  className="text-blue-400 hover:text-blue-300 p-0 h-auto"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    resetForm();
                  }}
                >
                  {isLogin ? "Create one here" : "Sign in here"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
