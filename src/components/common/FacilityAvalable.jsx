import {
  Wifi,
  Snowflake,
  Utensils,
  Droplets,
  Fan,
  Zap,
  MapPin,
  Move,
  Shield,
  Home,
  Tv,
  BatteryCharging,
  Bed
} from 'lucide-react';
import React from 'react';

export default function FacilityAvailable({ facilities }) {
  return (
    <div className="flex gap-2 text-secondary flex-wrap my-3">
      {/* WiFi */}
      {facilities?.wifi && (
        <div className="relative group cursor-pointer ">
          <img src="/assets/icons/Wifi.png" alt="wifi" className='w-5 h-5' />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            WiFi
          </span>
        </div>
      )}

      {/* Air Conditioning */}
      {facilities?.airConditioning && (
        <div className="relative group cursor-pointer">
          <img src="/assets/icons/aircon.png" alt="wifi" className='w-5 h-5' />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Air Conditioning
          </span>
        </div>
      )}

      {/* Snack */}
      {facilities?.snack && (
        <div className="relative group cursor-pointer">
          <img src="/assets/icons/snack-icon.png" alt="wifi" className='w-5 h-5' />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Snack
          </span>
        </div>
      )}

      {/* Water Bottle */}
      {facilities?.waterBottle && (
        <div className="relative group cursor-pointer">
          <img src="/assets/icons/water-bottle-icon.png" alt="wifi" className='w-5 h-5' />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Water Bottle
          </span>
        </div>
      )}

      {/* Wet Towel */}
      {facilities?.wetTowel && (
        <div className="relative group cursor-pointer">
          <img src="/assets/icons/wet-tower.png" alt="wifi" className='w-5 h-5' />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Wet Towel
          </span>
        </div>
      )}

      {/* Power Outlet */}
      {facilities?.powerOutlet && (
        <div className="relative group cursor-pointer">
          <img src="/assets/icons/power-outlet-icon.png" alt="wifi" className='w-5 h-5' />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Power Outlet
          </span>
        </div>
      )}

      {/* GPS */}
      {facilities?.gps && (
        <div className="relative group cursor-pointer">
          <img src="/assets/icons/gps.png" alt="wifi" className='w-5 h-5' />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            GPS
          </span>
        </div>
      )}

      {/* Leg Room */}
      {facilities?.legRoom && (
        <div className="relative group cursor-pointer">
          <img src="/assets/icons/legroom.png" alt="wifi" className='w-5 h-5' />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Extra Leg Room
          </span>
        </div>
      )}

      {/* Seat Belt */}
      {facilities?.seatBelt && (
        <div className="relative group cursor-pointer">
          <img src="/assets/icons/seat-belt.png" alt="wifi" className='w-5 h-5' />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Seat Belt
          </span>
        </div>
      )}

      {/* Toilet */}
      {facilities?.toilet && (
        <div className="relative group cursor-pointer">
          <img src="/assets/icons/toilet.png" alt="wifi" className='w-5 h-5' />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Toilet
          </span>
        </div>
      )}

      {/* TV */}
      {facilities?.tv && (
        <div className="relative group cursor-pointer">
          <img src="/assets/icons/tv.png" alt="wifi" className='w-5 h-5' />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            TV
          </span>
        </div>
      )}

      {/* USB Charger */}
      {facilities?.usbCharger && (
        <div className="relative group cursor-pointer">
          <img src="/assets/icons/usb-charger-icon.png" alt="wifi" className='w-5 h-5' />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            USB Charger
          </span>
        </div>
      )}

      {/* Sleeping Bed */}
      {facilities?.sleepingBed && (
        <div className="relative group cursor-pointer">
          <img src="/assets/icons/sleeping-bed-icon-orange.png" alt="wifi" className='w-5 h-5' />
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Sleeping Bed
          </span>
        </div>
      )}
    </div>
  );
}