import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, Mail, Phone, MapPin, Clock, Send,
  Linkedin, Twitter, Facebook, Instagram, ArrowRight,
  CheckCircle, AlertCircle
} from 'lucide-react';

const Contact = () => {
  const [formStatus, setFormStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormStatus('success');
    setLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
    
      <motion.div
        className="relative min-h-[40vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient" />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Get in Touch
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Have questions about our AI trainer? We're here to help you achieve your fitness goals.
          </motion.p>
        </div>
      </motion.div>

      
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
           
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                <p className="text-gray-400 mb-8">
                  Choose the most convenient way to reach us. Our support team is available 24/7.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-400">support@aitrainer.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Hours</h3>
                    <p className="text-gray-400">24/7 AI Support</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-gray-400">123 Fitness Street, CA 94105</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-8">
                <h3 className="font-semibold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {[
                    { icon: Twitter, href: '#' },
                    { icon: Facebook, href: '#' },
                    { icon: Instagram, href: '#' },
                    { icon: Linkedin, href: '#' }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gray-800 transition-colors"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

           
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-zinc-900/50 rounded-2xl p-8 border border-gray-800 backdrop-blur-sm"
            >
              <motion.form variants={itemVariants} onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-gray-300">Name</span>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-xl bg-zinc-800 border border-gray-700 px-4 py-3 text-gray-300 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 transition-colors"
                      placeholder="Your name"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="text-gray-300">Email</span>
                    <input
                      type="email"
                      className="mt-1 block w-full rounded-xl bg-zinc-800 border border-gray-700 px-4 py-3 text-gray-300 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 transition-colors"
                      placeholder="your@email.com"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="text-gray-300">Subject</span>
                    <select
                      className="mt-1 block w-full rounded-xl bg-zinc-800 border border-gray-700 px-4 py-3 text-gray-300 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 transition-colors"
                      required
                    >
                      <option value="">Select a topic</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="feature">Feature Request</option>
                      <option value="other">Other</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-gray-300">Message</span>
                    <textarea
                      className="mt-1 block w-full rounded-xl bg-zinc-800 border border-gray-700 px-4 py-3 text-gray-300 focus:border-purple-500 focus:ring-purple-500 focus:ring-1 transition-colors"
                      rows="4"
                      placeholder="How can we help?"
                      required
                    ></textarea>
                  </label>
                </div>

                <motion.button
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold flex items-center justify-center gap-2 group disabled:opacity-50"
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>

                {formStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-green-500"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Message sent successfully!</span>
                  </motion.div>
                )}
              </motion.form>
            </motion.div>
          </div>
        </div>
      </section>

      
      <section className="py-20 px-4 bg-gradient-to-b from-zinc-900 to-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.div
            className="grid gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                q: "How quickly can I expect a response?",
                a: "Our AI support is available 24/7 for immediate assistance. For specific inquiries, our human team typically responds within 2-4 hours during business hours."
              },
              {
                q: "Can I schedule a demo of the AI trainer?",
                a: "Yes! You can schedule a free demo through our platform to experience the AI trainer firsthand and see how it adapts to your needs."
              },
              {
                q: "What if I need technical support?",
                a: "Our technical support team is available 24/7 through the chat system in the app, or you can email us for detailed assistance."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-zinc-900/50 rounded-2xl p-6 border border-gray-800 text-left"
              >
                <h3 className="font-semibold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;