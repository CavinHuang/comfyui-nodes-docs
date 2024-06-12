---
tags:
- AnimationScheduling
- Scheduling
---

# 📋 CR Output Schedule To File
## Documentation
- Class name: `CR Output Schedule To File`
- Category: `🧩 Comfyroll Studio/🎥 Animation/📋 Schedule`
- Output node: `True`

This node is designed to output animation schedules to a file, supporting both CSV and text formats. It ensures unique file naming to avoid overwriting existing files and provides flexibility in specifying the output file path, name, and extension.
## Input types
### Required
- **`output_file_path`**
    - Specifies the directory path where the output file will be saved. It plays a crucial role in determining the location of the generated file.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`file_name`**
    - The base name of the output file. This name is essential for identifying the file and can be modified to ensure uniqueness if a file with the same name already exists.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`file_extension`**
    - Determines the format of the output file (e.g., 'csv' or 'txt'). This affects how the schedule data is formatted and saved.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`schedule`**
    - The animation schedule data to be written to the file. This data is central to the node's purpose, as it represents the content that will be saved in the specified format.
    - Comfy dtype: `SCHEDULE`
    - Python dtype: `list`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_OutputScheduleToFile:
    
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "output_file_path": ("STRING", {"multiline": False, "default": ""}),
            "file_name": ("STRING", {"multiline": False, "default": ""}),
            "file_extension": (["txt", "csv"],),
            "schedule": ("SCHEDULE",),
            }
        }

    RETURN_TYPES = ()
    OUTPUT_NODE = True
    FUNCTION = "csvoutput"
    CATEGORY = icons.get("Comfyroll/Animation/Schedule") 
    
    def csvoutput(self, output_file_path, file_name, schedule, file_extension):
        filepath = output_file_path + "\\" + file_name + "." + file_extension
        
        index = 2

        if(output_file_path == "" or file_name == ""):
            print(f"[Warning] CR Output Schedule To File. No file details found. No file output.") 
            return ()

        while os.path.exists(filepath):
            if os.path.exists(filepath):
                filepath = output_file_path + "\\" + file_name + str(index) + "." + file_extension

                index = index + 1
            else:
                break            
        
        print(f"[Info] CR Output Schedule To File: Saving to {filepath}")        
        
        if file_extension == "csv":
            with open(filepath, "w", newline="") as csv_file:
                csv_writer = csv.writer(csv_file)
                csv_writer.writerows(schedule)
        else:
            with open(filepath, "w", newline="") as text_writer:
                for line in schedule:
                    str_item = f'{line[0]},"{line[1]}"\n'
                    text_writer.write(str_item)
        
        
        return ()

```
