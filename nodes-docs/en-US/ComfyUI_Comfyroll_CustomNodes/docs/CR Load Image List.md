---
tags:
- Image
- ImageListLoader
---

# ⌨️ CR Load Image List
## Documentation
- Class name: `CR Load Image List`
- Category: `🧩 Comfyroll Studio/✨ Essential/📜 List/⌨️ IO`
- Output node: `False`

This node is designed to load a list of images from a specified directory, ensuring the images are in a format suitable for further processing or analysis. It focuses on organizing and converting images into a consistent format, facilitating their use in image-based workflows.
## Input types
### Required
- **`input_folder`**
    - Specifies the folder within the input directory from which images are to be loaded. It is essential for targeting a specific subset of images for processing.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`start_index`**
    - Determines the starting index from which images in the directory are considered, allowing for selective processing of images based on their order.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`max_images`**
    - Defines the maximum number of images to be loaded from the directory, enabling control over the volume of images processed.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`input_path`**
    - Allows specifying a direct path to the folder from which images are to be loaded, offering an alternative to the default input directory.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - A list of images that have been loaded and converted to a consistent format, ready for further processing or analysis.
    - Python dtype: `List[torch.Tensor]`
- **`show_help`**
    - Comfy dtype: `STRING`
    - Provides a URL to the help documentation for this node.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_LoadImageList:

    @classmethod
    def INPUT_TYPES(s):
    
        input_dir = folder_paths.input_directory
        image_folder = [name for name in os.listdir(input_dir) if os.path.isdir(os.path.join(input_dir,name))] 
    
        return {"required": {"input_folder": (sorted(image_folder), ),
                             "start_index": ("INT", {"default": 0, "min": 0, "max": 9999}),
                             "max_images": ("INT", {"default": 1, "min": 1, "max": 9999}),
               },
               "optional": {"input_path": ("STRING", {"default": '', "multiline": False}),     
               }
        }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("IMAGE", "show_help", )
    OUTPUT_IS_LIST = (True, False)
    FUNCTION = "make_list"
    CATEGORY = icons.get("Comfyroll/List/IO")

    def make_list(self, start_index, max_images, input_folder, input_path=None):

        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-image-list"

        # Set the input path
        if input_path != '' and input_path is not None:
            if not os.path.exists(input_path):
                print(f"[Warning] CR Image List: The input_path `{input_path}` does not exist")
                return ("",)  
            in_path = input_path
        else:
            input_dir = folder_paths.input_directory
            in_path = os.path.join(input_dir, input_folder)

        # Check if the folder is empty
        if not os.listdir(in_path):
            print(f"[Warning] CR Image List: The folder `{in_path}` is empty")
            return None

        file_list = sorted(os.listdir(in_path), key=lambda s: sum(((s, int(n)) for s, n in re.findall(r'(\D+)(\d+)', 'a%s0' % s)), ()))
        
        image_list = []
        
        # Ensure start_index is within the bounds of the list
        start_index = max(0, min(start_index, len(file_list) - 1))

        # Calculate the end index based on max_rows
        end_index = min(start_index + max_images, len(file_list) - 1)
                    
        for num in range(start_index, end_index):
            img = Image.open(os.path.join(in_path, file_list[num]))
            image = img.convert("RGB")
            image_list.append(pil2tensor(image))
        
        if not image_list:
            # Handle the case where the list is empty
            print("CR Load Image List: No images found.")
            return None
            
        images = torch.cat(image_list, dim=0)
        images_out = [images[i:i + 1, ...] for i in range(images.shape[0])]

        return (images_out, show_help, )

```
