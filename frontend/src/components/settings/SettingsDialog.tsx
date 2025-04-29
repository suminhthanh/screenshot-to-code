import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaCog } from "react-icons/fa";
import { EditorTheme, Settings } from "../../types";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { capitalize } from "../../lib/utils";
import { IS_RUNNING_ON_CLOUD } from "../../config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface Props {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
}

function SettingsDialog({ settings, setSettings }: Props) {
  const handleThemeChange = (theme: EditorTheme) => {
    setSettings((s) => ({
      ...s,
      editorTheme: theme,
    }));
  };

  return (
    <Dialog>
      <DialogTrigger>
        <FaCog />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Settings</DialogTitle>
        </DialogHeader>

        <div className="flex items-center space-x-2">
          <Label htmlFor="image-generation">
            <div>DALL-E Placeholder Image Generation</div>
            <div className="font-light mt-2 text-xs">
              More fun with it but if you want to save money, turn it off.
            </div>
          </Label>
          <Switch
            id="image-generation"
            checked={settings.isImageGenerationEnabled}
            onCheckedChange={() =>
              setSettings((s) => ({
                ...s,
                isImageGenerationEnabled: !s.isImageGenerationEnabled,
              }))
            }
          />
        </div>
        <div className="flex flex-col space-y-6">
          <div>
            <Label htmlFor="openai-api-key">
              <div>OpenAI API key</div>
              <div className="font-light mt-1 mb-2 text-xs leading-relaxed">
                Only stored in your browser. Never stored on servers. Overrides
                your .env config.
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center font-bold text-blue-500"
                >
                  Get your API Key from Google
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-1 w-3 h-3"
                    data-icon="LinkExternal02"
                    aria-hidden="true"
                  >
                    <g id="link-external-02">
                      <path
                        id="Icon"
                        d="M10.5 4.5L10.5 1.5M10.5 1.5H7.49999M10.5 1.5L6 6M5 1.5H3.9C3.05992 1.5 2.63988 1.5 2.31901 1.66349C2.03677 1.8073 1.8073 2.03677 1.66349 2.31901C1.5 2.63988 1.5 3.05992 1.5 3.9V8.1C1.5 8.94008 1.5 9.36012 1.66349 9.68099C1.8073 9.96323 2.03677 10.1927 2.31901 10.3365C2.63988 10.5 3.05992 10.5 3.9 10.5H8.1C8.94008 10.5 9.36012 10.5 9.68099 10.3365C9.96323 10.1927 10.1927 9.96323 10.3365 9.68099C10.5 9.36012 10.5 8.94008 10.5 8.1V7"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </g>
                  </svg>
                </a>
              </div>
            </Label>

            <Input
              id="openai-api-key"
              placeholder="OpenAI API key"
              value={settings.openAiApiKey || ""}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  openAiApiKey: e.target.value,
                }))
              }
            />
          </div>

          {!IS_RUNNING_ON_CLOUD && (
            <div>
              <Label htmlFor="openai-api-key">
                <div>OpenAI Base URL (optional)</div>
                <div className="font-light mt-1 mb-2 text-xs leading-relaxed">
                  Replace with a proxy URL if you don't want to use the default.
                  Example:{" "}
                  <a
                    href="https://generativelanguage.googleapis.com/v1beta/openai/"
                    className="inline-flex items-center font-bold text-blue-500"
                    onClick={(e) => {
                      e.preventDefault();
                      setSettings((s) => ({
                        ...s,
                        openAiBaseURL:
                          "https://generativelanguage.googleapis.com/v1beta/openai/",
                      }));
                    }}
                  >
                    https://generativelanguage.googleapis.com/v1beta/openai/
                  </a>
                </div>
              </Label>

              <Input
                id="openai-base-url"
                placeholder="OpenAI Base URL"
                value={settings.openAiBaseURL || ""}
                onChange={(e) =>
                  setSettings((s) => ({
                    ...s,
                    openAiBaseURL: e.target.value,
                  }))
                }
              />
            </div>
          )}

          <div>
            <Label htmlFor="anthropic-api-key">
              <div>Anthropic API key</div>
              <div className="font-light mt-1 text-xs leading-relaxed">
                Only stored in your browser. Never stored on servers. Overrides
                your .env config.
              </div>
            </Label>

            <Input
              id="anthropic-api-key"
              placeholder="Anthropic API key"
              value={settings.anthropicApiKey || ""}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  anthropicApiKey: e.target.value,
                }))
              }
            />
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Screenshot by URL Config</AccordionTrigger>
              <AccordionContent>
                <Label htmlFor="screenshot-one-api-key">
                  <div className="leading-normal font-normal text-xs">
                    If you want to use URLs directly instead of taking the
                    screenshot yourself, add a ScreenshotOne API key.{" "}
                    <a
                      href="https://screenshotone.com?via=screenshot-to-code"
                      className="underline"
                      target="_blank"
                    >
                      Get 100 screenshots/mo for free.
                    </a>
                  </div>
                </Label>

                <Input
                  id="screenshot-one-api-key"
                  className="mt-2"
                  placeholder="ScreenshotOne API key"
                  value={settings.screenshotOneApiKey || ""}
                  onChange={(e) =>
                    setSettings((s) => ({
                      ...s,
                      screenshotOneApiKey: e.target.value,
                    }))
                  }
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Theme Settings</AccordionTrigger>
              <AccordionContent className="space-y-4 flex flex-col">
                <div className="flex items-center justify-between">
                  <Label htmlFor="app-theme">
                    <div>App Theme</div>
                  </Label>
                  <div>
                    <button
                      className="flex rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50t"
                      onClick={() => {
                        document
                          .querySelector("div.mt-2")
                          ?.classList.toggle("dark"); // enable dark mode for sidebar
                        document.body.classList.toggle("dark");
                        document
                          .querySelector('div[role="presentation"]')
                          ?.classList.toggle("dark"); // enable dark mode for upload container
                      }}
                    >
                      Toggle dark mode
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="editor-theme">
                    <div>
                      Code Editor Theme - requires page refresh to update
                    </div>
                  </Label>
                  <div>
                    <Select // Use the custom Select component here
                      name="editor-theme"
                      value={settings.editorTheme}
                      onValueChange={(value) =>
                        handleThemeChange(value as EditorTheme)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        {capitalize(settings.editorTheme)}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cobalt">Cobalt</SelectItem>
                        <SelectItem value="espresso">Espresso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <DialogFooter>
          <DialogClose>Save</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SettingsDialog;
