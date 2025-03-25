import { useState, ChangeEvent } from "react";
import { ChevronLeftIcon, } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import { Link } from "react-router";

type BusinessCategory = 
  | "Retail" 
  | "Food & Beverage" 
  | "Technology" 
  | "Healthcare" 
  | "Finance" 
  | "Education"
  | "Entertainment" 
  | "Real Estate" 
  | "Manufacturing"
  | "Professional Services" 
  | "Beauty & Wellness" 
  | "Other";

export default function OnboardingForm() {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [colors, setColors] = useState<string[]>(["#3B82F6", "#10B981", "#6366F1"]);
  const [categories, setCategories] = useState<BusinessCategory[]>([]);
  const [logo, setLogo] = useState<string | null>(null);
  
  const availableCategories: BusinessCategory[] = [
    "Retail", "Food & Beverage", "Technology", 
    "Healthcare", "Finance", "Education",
    "Entertainment", "Real Estate", "Manufacturing",
    "Professional Services", "Beauty & Wellness", "Other"
  ];

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
  };

  const handleCategoryToggle = (category: BusinessCategory) => {
    if (categories.includes(category)) {
      setCategories(categories.filter(c => c !== category));
    } else if (categories.length < 3) {
      setCategories([...categories, category]);
    }
  };

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link
          to="/signup"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Onboarding
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Complete your business profile to get started!
            </p>
          </div>
          
          <form>
            <div className="space-y-5">
              {/* Business Information Section */}
              <div>
                <h2 className="mb-3 text-lg font-medium text-gray-800 dark:text-white/90">Business Information</h2>
                
                {/* Business Name */}
                <div className="mb-4">
                  <Label>
                    Business Name<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="businessName"
                    name="businessName"
                    placeholder="Enter your business name"
                  />
                </div>
                
                {/* Contact Person Name */}
                <div className="mb-4">
                  <Label>
                    Contact Person Name<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="contactPerson"
                    name="contactPerson"
                    placeholder="Enter contact person's name"
                  />
                </div>
                
                {/* Business Email */}
                <div className="mb-4">
                  <Label>
                    Business Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="businessEmail"
                    name="businessEmail"
                    placeholder="Enter business email"
                  />
                </div>
                
                {/* Contact Person Email */}
                <div className="mb-4">
                  <Label>
                    Contact Person Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    placeholder="Enter contact person's email"
                  />
                </div>
                
                {/* Business Address */}
                <div className="mb-4">
                  <Label>
                    Business Address<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="businessAddress"
                    name="businessAddress"
                    placeholder="Enter business address"
                  />
                </div>
                
                {/* Business Phone */}
                <div className="mb-4">
                  <Label>
                    Business Phone Number<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="tel"
                    id="businessPhone"
                    name="businessPhone"
                    placeholder="Enter business phone number"
                  />
                </div>
                
                {/* Contact Person Phone */}
                <div className="mb-4">
                  <Label>
                    Contact Person Phone Number
                  </Label>
                  <Input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    placeholder="Enter contact person's phone number"
                  />
                </div>
              </div>
              
              {/* Branding Section */}
              <div>
                <h2 className="mb-3 text-lg font-medium text-gray-800 dark:text-white/90">Branding</h2>
                
                {/* Business Logo */}
                <div className="mb-4">
                  <Label>Upload Business Logo</Label>
                  <div className="flex items-center gap-4">
                    <label className="flex flex-col items-center justify-center px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 dark:border-gray-700">
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleLogoUpload} 
                      />
                      <span className="text-sm text-gray-500">Click to upload</span>
                      <span className="text-xs text-gray-400">PNG, JPG up to 2MB</span>
                    </label>
                    {logo && (
                      <div className="w-16 h-16 overflow-hidden rounded-lg">
                        <img src={logo} alt="Business logo" className="object-cover w-full h-full" />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Business Colors */}
                <div className="mb-4">
                  <Label>Choose 3 Business Colors</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {colors.map((color, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="relative">
                            <input
                              type="color"
                              value={color}
                              onChange={(e) => handleColorChange(index, e.target.value)}
                              className="absolute w-6 h-6 rounded-full opacity-0 cursor-pointer"
                              style={{
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                              }}
                            />
                            <div 
                              className="w-6 h-6 rounded-full border border-gray-600"
                              style={{ backgroundColor: color }}
                            />
                        </div>
                        <Input
                          type="text"
                          value={color}
                          onChange={(e) => handleColorChange(index, e.target.value)}
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Business Categories */}
              <div>
                <h2 className="mb-3 text-lg font-medium text-gray-800 dark:text-white/90">Business Category</h2>
                <Label>Choose up to 3 business categories</Label>
                <div className="grid grid-cols-2 gap-3 mt-2 sm:grid-cols-3">
                  {availableCategories.map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        checked={categories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        disabled={categories.length >= 3 && !categories.includes(category)}
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{category}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* About Business */}
              <div>
                <h2 className="mb-3 text-lg font-medium text-gray-800 dark:text-white/90">About Your Business</h2>
                <Label>Tell us about your business</Label>
                <textarea
                  id="aboutBusiness"
                  name="aboutBusiness"
                  rows={4}
                  className="w-full px-3 py-2 text-sm border rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  placeholder="Describe your business, products, services, and unique value proposition..."
                ></textarea>
              </div>
              
              {/* Terms and Conditions */}
              <div className="flex items-center gap-3 pt-2">
                <Checkbox
                  className="w-5 h-5"
                  checked={isChecked}
                  onChange={(checked) => setIsChecked(checked)}
                />
                <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                  I agree to the{" "}
                  <span className="text-gray-800 dark:text-white/90">
                    Terms and Conditions,
                  </span>{" "}
                  and our{" "}
                  <span className="text-gray-800 dark:text-white">
                    Privacy Policy
                  </span>
                </p>
              </div>
              
              {/* Submit Button */}
              <div>
                <Link  to="/dashboard/IG">
                <button
                  type="submit"
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                >
                  Sign up
                </button>
                </Link>
              </div>
            </div>
          </form>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Need help? {""}
              <Link
                to="/contact"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}