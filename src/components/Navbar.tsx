import { NavLink } from 'react-router-dom';
import { Home, PlusCircle, List, BarChart3, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/add', icon: PlusCircle, label: 'Add' },
    { to: '/transactions', icon: List, label: 'Transactions' },
    { to: '/reports', icon: BarChart3, label: 'Reports' },
  ];

  return (
    <nav className="border-b bg-card sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-card/95">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">BudgetTracker</span>
          </div>
          
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden border-t">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-1 px-3 py-2 rounded-md text-xs font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground'
                )
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
