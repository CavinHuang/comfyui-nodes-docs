---
tags:
- Text
---

# 🔤 CR Save Text To File
## Documentation
- Class name: `CR Save Text To File`
- Category: `🧩 Comfyroll Studio/🛠️ Utils/🔤 Text`
- Output node: `True`

The CR_SaveTextToFile node is designed for saving text data to a file, supporting both plain text and CSV formats. It intelligently handles file naming to avoid overwriting existing files and provides flexibility in specifying the output file's location, name, and extension.
## Input types
### Required
- **`multiline_text`**
    - The text content to be saved, which can be in multiline format. This content is either saved as plain text or parsed into a CSV format based on the file extension provided.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`output_file_path`**
    - The directory path where the output file will be saved. It is part of the final filepath construction.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`file_name`**
    - The base name of the output file. If a file with the same name already exists, the node will append a numerical suffix to ensure uniqueness.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`file_extension`**
    - The extension of the output file, determining whether the content is saved as plain text or CSV format.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to the node's documentation, providing additional help and examples.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_SaveTextToFile:

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "multiline_text": ("STRING", {"multiline": True, "default": ""}),
                        "output_file_path": ("STRING", {"multiline": False, "default": ""}),
                        "file_name": ("STRING", {"multiline": False, "default": ""}),
                        "file_extension": (["txt", "csv"],),
                        }
        }
        
    RETURN_TYPES = ("STRING", )
    RETURN_NAMES = ("show_help", ) 
    OUTPUT_NODE= True
    FUNCTION = 'save_list'
    CATEGORY = icons.get("Comfyroll/Utils/Text")

    def save_list(self, multiline_text, output_file_path, file_name, file_extension):
    
        show_help =  "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-save-text-to-file" 
    
        filepath = output_file_path + "\\" + file_name + "." + file_extension
 
        index = 1

        if(output_file_path == "" or file_name == ""):
            print(f"[Warning] CR Save Text List. No file details found. No file output.") 
            return ()

        while os.path.exists(filepath):
            if os.path.exists(filepath):
                filepath = output_file_path + "\\" + file_name + "_" + str(index) + "." + file_extension
                index = index + 1
            else:
                break            
        
        print(f"[Info] CR Save Text List: Saving to {filepath}")        
        
        if file_extension == "csv":
            text_list = []
            for i in multiline_text.split("\n"):
                text_list.append(i.strip())
        
            with open(filepath, "w", newline="") as csv_file:
                csv_writer = csv.writer(csv_file)
                # Write each line as a separate row in the CSV file
                for line in text_list:           
                    csv_writer.writerow([line])    
        else:
            with open(filepath, "w", newline="") as text_file:
                for line in multiline_text:
                    text_file.write(line)
        
        return (show_help, )  

```
