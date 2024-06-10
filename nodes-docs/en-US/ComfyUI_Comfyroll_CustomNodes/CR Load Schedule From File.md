---
tags:
- AnimationScheduling
- Scheduling
---

# 📋 CR Load Schedule From File
## Documentation
- Class name: `CR Load Schedule From File`
- Category: `🧩 Comfyroll Studio/🎥 Animation/📋 Schedule`
- Output node: `False`

This node is designed to load animation schedules from a specified file, enabling the dynamic control of animation parameters over time. It facilitates the integration of pre-defined animation timelines into the animation workflow, streamlining the process of applying complex animation schedules.
## Input types
### Required
- **`input_file_path`**
    - Specifies the directory path where the schedule file is located. This path is crucial for locating and loading the correct file.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`file_name`**
    - The name of the file to be loaded. This name, combined with the file extension, is used to identify and access the specific schedule file.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`file_extension`**
    - Defines the file format (e.g., 'txt', 'csv') of the schedule file. This information is essential for correctly parsing the file's content.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`SCHEDULE`**
    - Comfy dtype: `SCHEDULE`
    - The loaded schedule, represented as a structured format suitable for further processing and application within the animation workflow.
    - Python dtype: `list`
- **`show_text`**
    - Comfy dtype: `STRING`
    - Provides a textual representation of the loaded schedule, useful for debugging or informational purposes.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_LoadScheduleFromFile:
    
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "input_file_path": ("STRING", {"multiline": False, "default": ""}),
            "file_name": ("STRING", {"multiline": False, "default": ""}),
            "file_extension": (["txt", "csv"],),
            }
        }

    RETURN_TYPES = ("SCHEDULE", "STRING", )
    RETURN_NAMES = ("SCHEDULE", "show_text", )
    FUNCTION = "csvinput"
    CATEGORY = icons.get("Comfyroll/Animation/Schedule")    
    
    def csvinput(self, input_file_path, file_name, file_extension):
    
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Schedule-Nodes#cr-load-schedule-from-file"
        
        filepath = input_file_path + "\\" + file_name + "." + file_extension
        print(f"CR Load Schedule From File: Loading {filepath}")
        
        lists = []
            
        if file_extension == "csv":
            with open(filepath, "r") as csv_file:
                reader = csv.reader(csv_file)
        
                for row in reader:
                    lists.append(row)
                    
        else:
            with open(filepath, "r") as txt_file:
                for row in txt_file:
                    parts = row.strip().split(",", 1)
                    
                    if len(parts) >= 2:
                        second_part = parts[1].strip('"')
                        lists.append([parts[0], second_part])

        #print(lists)
        
        return(lists,str(lists),)

```
