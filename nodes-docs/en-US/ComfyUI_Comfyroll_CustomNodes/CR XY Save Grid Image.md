---
tags:
- Image
---

# 📉 CR XY Save Grid Image
## Documentation
- Class name: `CR XY Save Grid Image`
- Category: `🧩 Comfyroll Studio/✨ Essential/📉 XY Grid`
- Output node: `True`

This node is designed to save a grid of images to a specified output path, optionally adding annotations to the images. It supports various file formats and allows for customization of image saving parameters such as compression level and quality. The node can operate in different modes, such as saving for output or generating a temporary preview, and provides a UI component for previewing the saved images.
## Input types
### Required
- **`mode`**
    - Specifies the operation mode of the node, which can be either 'Save' for saving images to a permanent location or 'Preview' for generating temporary images for preview purposes. This affects the type of path used for saving and the metadata associated with the saved images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`output_folder`**
    - The name of the folder where the images will be saved. This folder is created inside a predefined output directory.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`image`**
    - The image or images to be saved. This can be a single image or a list of images to be arranged in a grid.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`filename_prefix`**
    - A prefix added to the filename of the saved images, useful for organizing and identifying images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`file_format`**
    - The file format in which the images will be saved. Supports common formats like PNG, JPG, WEBP, and TIFF.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`output_path`**
    - An optional custom path where the images will be saved. If provided, it overrides the default output folder path.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`trigger`**
    - A boolean flag that must be set to True to activate the image saving process. If False, the node does not perform any action.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`ui`**
    - Provides a UI component for previewing the saved images, including file names and paths.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_XYSaveGridImage:
# originally based on SaveImageSequence by mtb

    def __init__(self):
        self.type = "output"

    @classmethod
    def INPUT_TYPES(cls):
    
        output_dir = folder_paths.output_directory
        output_folders = [name for name in os.listdir(output_dir) if os.path.isdir(os.path.join(output_dir,name))]
    
        return {
            "required": {"mode": (["Save", "Preview"],),
                         "output_folder": (sorted(output_folders), ),
                         "image": ("IMAGE", ),
                         "filename_prefix": ("STRING", {"default": "CR"}),
                         "file_format": (["webp", "jpg", "png", "tif"],),
            },
            "optional": {"output_path": ("STRING", {"default": '', "multiline": False}),
                         "trigger": ("BOOLEAN", {"default": False},),                         
            }
        }

    RETURN_TYPES = ()
    FUNCTION = "save_image"
    OUTPUT_NODE = True
    CATEGORY = icons.get("Comfyroll/XY Grid") 
            
    def save_image(self, mode, output_folder, image, file_format, output_path='', filename_prefix="CR", trigger=False):

        if trigger == False:
            return ()
        
        output_dir = folder_paths.get_output_directory()  
        out_folder = os.path.join(output_dir, output_folder)

        # Set the output path
        if output_path != '':
            if not os.path.exists(output_path):
                print(f"[Warning] CR Save XY Grid Image: The input_path `{output_path}` does not exist")
                return ("",)
            out_path = output_path
        else:
            out_path = os.path.join(output_dir, out_folder)
        
        if mode == "Preview":
            out_path = folder_paths.temp_directory

        print(f"[Info] CR Save XY Grid Image: Output path is `{out_path}`")
        
        # Set the counter
        counter = find_highest_numeric_value(out_path, filename_prefix) + 1
        #print(f"[Debug] counter {counter}")
        
        # Output image
        output_image = image[0].cpu().numpy()
        img = Image.fromarray(np.clip(output_image * 255.0, 0, 255).astype(np.uint8))
        
        output_filename = f"{filename_prefix}_{counter:05}"
        img_params = {'png': {'compress_level': 4}, 
                      'webp': {'method': 6, 'lossless': False, 'quality': 80},
                      'jpg': {'format': 'JPEG'},
                      'tif': {'format': 'TIFF'}
                     } 
        self.type = "output" if mode == "Save" else 'temp'

        resolved_image_path = os.path.join(out_path, f"{output_filename}.{file_format}")
        img.save(resolved_image_path, **img_params[file_format])
        print(f"[Info] CR Save XY Grid Image: Saved to {output_filename}.{file_format}")
        out_filename = f"{output_filename}.{file_format}"
        preview = {"ui": {"images": [{"filename": out_filename,"subfolder": out_path,"type": self.type,}]}}
       
        return preview

```
