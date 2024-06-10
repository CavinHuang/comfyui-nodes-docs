---
tags:
- Image
- ImageListLoader
---

# ⌨️ CR Load Image List Plus
## Documentation
- Class name: `CR Load Image List Plus`
- Category: `🧩 Comfyroll Studio/✨ Essential/📜 List/⌨️ IO`
- Output node: `False`

The CR Load Image List Plus node is designed to load a list of images from a specified directory, along with additional information such as masks, indexes, filenames, and EXIF data. It aims to provide a comprehensive set of data for each image, facilitating advanced image processing and manipulation tasks.
## Input types
### Required
- **`input_folder`**
    - Specifies the directory from which images are to be loaded. It plays a crucial role in determining the source of the images and ensuring they are accessible for processing.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`start_index`**
    - Determines the starting point within the list of images to begin loading, allowing for selective processing of images based on their order in the directory.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`max_images`**
    - Limits the number of images to be loaded from the directory, enabling control over the volume of data processed at one time.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`input_path`**
    - An optional path to a specific directory or file from which images are to be loaded, providing an alternative to the default input folder.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - A list of loaded images, each converted to a tensor format suitable for further processing.
    - Python dtype: `List[torch.Tensor]`
- **`MASK`**
    - Comfy dtype: `MASK`
    - A list of masks associated with the loaded images, providing additional data for image manipulation tasks.
    - Python dtype: `List[torch.Tensor]`
- **`index`**
    - Comfy dtype: `INT`
    - A list of indexes corresponding to the loaded images, offering a reference for image identification and ordering.
    - Python dtype: `List[int]`
- **`filename`**
    - Comfy dtype: `STRING`
    - A list of filenames for the loaded images, aiding in tracking and referencing the images.
    - Python dtype: `List[str]`
- **`width`**
    - Comfy dtype: `INT`
    - The width of the loaded images, providing dimensional data for processing.
    - Python dtype: `int`
- **`height`**
    - Comfy dtype: `INT`
    - The height of the loaded images, providing dimensional data for processing.
    - Python dtype: `int`
- **`list_length`**
    - Comfy dtype: `INT`
    - The total number of images loaded, offering insight into the dataset size.
    - Python dtype: `int`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A link to the help documentation for the node, offering additional information and guidance.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_LoadImageListPlus:

    @classmethod
    def INPUT_TYPES(s):
    
        input_dir = folder_paths.input_directory
        image_folder = [name for name in os.listdir(input_dir) if os.path.isdir(os.path.join(input_dir,name))] 
    
        return {"required": {"input_folder": (sorted(image_folder), ),
                             "start_index": ("INT", {"default": 0, "min": 0, "max": 99999}),
                             "max_images": ("INT", {"default": 1, "min": 1, "max": 99999}),
               },
               "optional": {"input_path": ("STRING", {"default": '', "multiline": False}),     
               }
        }

    RETURN_TYPES = ("IMAGE", "MASK", "INT", "STRING", "INT", "INT", "INT", "STRING", )
    RETURN_NAMES = ("IMAGE", "MASK", "index", "filename", "width", "height", "list_length", "show_help", )
    OUTPUT_IS_LIST = (True, True, True, True, False, False, False, False)
    FUNCTION = "make_list"
    CATEGORY = icons.get("Comfyroll/List/IO")

    def make_list(self, start_index, max_images, input_folder, input_path=None, vae=None):
    
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-image-list-plus"

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
        mask_list = []
        index_list = []        
        filename_list = []
        exif_list = []         
        
        # Ensure start_index is within the bounds of the list
        start_index = max(0, min(start_index, len(file_list) - 1))

        # Calculate the end index based on max_rows
        end_index = min(start_index + max_images, len(file_list) - 1)
                    
        for num in range(start_index, end_index):
            filename = file_list[num]
            img_path = os.path.join(in_path, filename)
            
            img = Image.open(os.path.join(in_path, file_list[num]))            
            image_list.append(pil2tensor(img.convert("RGB")))
            
            tensor_img = pil2tensor(img)
            mask_list.append(tensor2rgba(tensor_img)[:,:,:,0])
           
            # Populate the image index
            index_list.append(num)

            # Populate the filename_list
            filename_list.append(filename)
            
        if not image_list:
            # Handle the case where the list is empty
            print("CR Load Image List: No images found.")
            return None

        width, height = Image.open(os.path.join(in_path, file_list[start_index])).size
            
        images = torch.cat(image_list, dim=0)
        images_out = [images[i:i + 1, ...] for i in range(images.shape[0])]

        masks = torch.cat(mask_list, dim=0)
        mask_out = [masks[i:i + 1, ...] for i in range(masks.shape[0])]
        
        list_length = end_index - start_index
        
        return (images_out, mask_out, index_list, filename_list, index_list, width, height, list_length, show_help, )

```
