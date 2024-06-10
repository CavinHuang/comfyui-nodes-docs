---
tags:
- Image
---

# 📉 CR XY From Folder
## Documentation
- Class name: `CR XY From Folder`
- Category: `🧩 Comfyroll Studio/✨ Essential/📉 XY Grid`
- Output node: `False`

The CR XY From Folder node is designed to automate the process of loading and processing a sequence of images from a specified folder, converting them into a format suitable for further manipulation or analysis. This node streamlines the task of handling multiple images, facilitating operations such as annotation and organization into a grid layout based on their filenames.
## Input types
### Required
- **`image_folder`**
    - Specifies the list of subfolders within the specified directory from which images are to be loaded. This allows for targeted processing of images grouped in specific folders.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`start_index`**
    - Defines the starting index for processing images within the folder. This allows for selective processing of images, starting from a specific point in the sequence.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`end_index`**
    - Specifies the ending index for image processing, enabling selective processing of images within a defined range.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`max_columns`**
    - Sets the maximum number of columns for organizing the images into a grid layout. This parameter helps in structuring the output in a visually coherent manner.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`x_annotation`**
    - Provides the annotations for the x-axis of the grid, allowing for descriptive labeling of columns.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`y_annotation`**
    - Supplies the annotations for the y-axis of the grid, enabling descriptive labeling of rows.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`font_size`**
    - Determines the font size used for annotating the images. This parameter is crucial for ensuring that annotations are legible and appropriately scaled.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`gap`**
    - Specifies the gap between images in the grid layout. This parameter allows for adjusting the spacing to achieve the desired layout appearance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`trigger`**
    - Acts as a control mechanism to initiate the node's operation. When set to True, the node proceeds with loading and processing the images from the specified folder.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The processed images organized into a grid layout, ready for further manipulation or analysis.
    - Python dtype: `List[Image]`
- **`trigger`**
    - Comfy dtype: `BOOLEAN`
    - Indicates whether the node's operation was initiated.
    - Python dtype: `bool`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides helpful information or guidance related to the node's functionality.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_XYFromFolder:

    @classmethod
    def INPUT_TYPES(cls) -> dict[str, t.Any]:
    
        input_dir = folder_paths.output_directory
        image_folder = [name for name in os.listdir(input_dir) if os.path.isdir(os.path.join(input_dir,name))] 
        
        return {"required":
                    {"image_folder": (sorted(image_folder), ),
                     "start_index": ("INT", {"default": 1, "min": 0, "max": 10000}),
                     "end_index": ("INT", {"default": 1, "min": 1, "max": 10000}),
                     "max_columns": ("INT", {"default": 1, "min": 1, "max": 10000}),
                     "x_annotation": ("STRING", {"multiline": True}),                     
                     "y_annotation": ("STRING", {"multiline": True}),  
                     "font_size": ("INT", {"default": 50, "min": 1}),
                     "gap": ("INT", {"default": 0, "min": 0}),
                     },
                "optional": {
                    "trigger": ("BOOLEAN", {"default": False},),
            }                     
                }

    RETURN_TYPES = ("IMAGE", "BOOLEAN", "STRING", )
    RETURN_NAMES = ("IMAGE", "trigger", "show_help", )
    FUNCTION = "load_images"
    CATEGORY = icons.get("Comfyroll/XY Grid") 
    
    def load_images(self, image_folder, start_index, end_index, max_columns, x_annotation, y_annotation, font_size, gap, trigger=False):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/XY-Grid-Nodes#cr-xy-from-folder"

        if trigger == False:
            return((), False, show_help, )
            
        input_dir = folder_paths.output_directory
        image_path = os.path.join(input_dir, image_folder)
        file_list = sorted(os.listdir(image_path), key=lambda s: sum(((s, int(n)) for s, n in re.findall(r'(\D+)(\d+)', 'a%s0' % s)), ()))
        
        sample_frames = []
        pillow_images = []
        
        if len(file_list) < end_index:
            end_index = len(file_list)

        for num in range(start_index, end_index + 1):
            i = Image.open(os.path.join(image_path, file_list[num - 1]))
            image = i.convert("RGB")
            image = np.array(image).astype(np.float32) / 255.0
            image = torch.from_numpy(image)[None,]
            image = image.squeeze()
            sample_frames.append(image)
        
        resolved_font_path = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), "fonts\Roboto-Regular.ttf")
        font = ImageFont.truetype(str(resolved_font_path), size=font_size)
        
        start_x_ann = (start_index % max_columns) - 1
        start_y_ann = int(start_index / max_columns) 
        
        column_list = x_annotation.split(";")[start_x_ann:]
        row_list = y_annotation.split(";")[start_y_ann:]
        
        column_list = [item.strip() for item in column_list]
        row_list = [item.strip() for item in row_list]
         
        annotation = Annotation(column_texts=column_list, row_texts=row_list, font=font)              
        images = torch.stack(sample_frames)
        
        pillow_images = [tensor_to_pillow(i) for i in images]
        pillow_grid = create_images_grid_by_columns(
            images=pillow_images,
            gap=gap,
            annotation=annotation,
            max_columns=max_columns,
        )
        tensor_grid = pillow_to_tensor(pillow_grid)

        return (tensor_grid, trigger, show_help, )

```
