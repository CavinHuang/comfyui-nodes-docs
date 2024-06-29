---
tags:
- Animation
- Image
---

# ⌨️ CR Load GIF As List
## Documentation
- Class name: `CR Load GIF As List`
- Category: `🧩 Comfyroll Studio/✨ Essential/📜 List/⌨️ IO`
- Output node: `False`

This node is designed to load GIF images as a list, allowing for the manipulation and analysis of individual frames within the GIF. It provides functionality to specify the starting frame and the maximum number of frames to be loaded, making it a versatile tool for handling GIF animations in a granular manner.
## Input types
### Required
- **`input_folder`**
    - Specifies the folder containing the GIF file to be loaded. This parameter is crucial for locating the GIF file within the filesystem.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`gif_filename`**
    - The name of the GIF file to be loaded. This parameter works in conjunction with `input_folder` to construct the full path to the GIF file.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`start_frame`**
    - Determines the starting frame from which the GIF should be loaded. This allows for skipping initial frames and starting from a specific point in the animation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`max_frames`**
    - Limits the number of frames to be loaded from the GIF. This is useful for controlling the amount of data processed and focusing on a specific segment of the animation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`input_path`**
    - An optional parameter that directly specifies the path to the GIF file, bypassing the need for `input_folder` and `gif_filename`.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - A list of tensors representing the loaded frames of the GIF. Each tensor corresponds to an individual frame, allowing for frame-by-frame manipulation.
    - Python dtype: `List[torch.Tensor]`
- **`MASK`**
    - Comfy dtype: `MASK`
    - A list of tensors representing the alpha masks of the loaded frames. This is useful for operations that require knowledge of the transparency or opacity of each frame.
    - Python dtype: `List[torch.Tensor]`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL to the help documentation for this node, providing additional information and guidance on its usage.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_LoadGIFAsList:
   
    @classmethod
    def INPUT_TYPES(cls):
    
        input_dir = folder_paths.input_directory
        image_folder = [name for name in os.listdir(input_dir) if os.path.isdir(os.path.join(input_dir,name))] 
    
        return {"required": {"input_folder": (sorted(image_folder), ),
                             "gif_filename": ("STRING", {"multiline": False, "default": "text"}),
                             "start_frame": ("INT", {"default": 0, "min": 0, "max": 99999}),
                             "max_frames": ("INT", {"default": 1, "min": 1, "max": 99999}),                              
                            },                    
                "optional": {"input_path": ("STRING", {"default": '', "multiline": False}),     
                }    
        }

    RETURN_TYPES = ("IMAGE", "MASK", "STRING", )
    RETURN_NAMES = ("IMAGE", "MASK", "show_help", )
    OUTPUT_IS_LIST = (True, True, False)
    FUNCTION = "load_gif"
    CATEGORY = icons.get("Comfyroll/List/IO")
 
    def load_gif(self, input_folder, gif_filename, start_frame, max_frames, input_path=None):
    
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/List-Nodes#cr-load-gif-images"
      
        # Set the input path
        if input_path != '' and input_path is not None:
            if not os.path.exists(input_path):
                print(f"[Warning] CR Image List: The input_path `{input_path}` does not exist")
                return ("",)  
            in_path = input_path
        else:
            input_dir = folder_paths.input_directory
            in_path = os.path.join(input_dir, input_folder)
  
        # Construct the GIF file path
        gif_file_path = os.path.join(in_path, gif_filename) 
  
        frames_list = []
        masks_list = []
         
        try:
            # Open the GIF file
            with Image.open(gif_file_path) as gif_image:
                   
                for i, frame in enumerate(ImageSequence.Iterator(gif_image)):
                    if i < start_frame:
                        continue  # Skip frames until reaching the start_frame

                    if max_frames is not None and i >= start_frame + max_frames:
                        break  # Stop after max_frames frames

                    # Extract frame
                    img = frame.copy()
                    width, height = img.size
                    frames_list.append(pil2tensor(img.convert("RGB")))
                        
                    tensor_img = pil2tensor(img)                   
                    masks_list.append(tensor2rgba(tensor_img)[:,:,:,0])
                        
            # Convert frames to tensor list
            images = torch.cat(frames_list, dim=0)
            images_out = [images[i:i + 1, ...] for i in range(images.shape[0])]

            # Convert masks to tensor list
            masks = torch.cat(masks_list, dim=0)
            masks_out = [masks[i:i + 1, ...] for i in range(masks.shape[0])]                        

            return (images_out, masks_out, show_help, )

        except Exception as e:
            print(f"Error: {e}")
            return (None, None, show_help, )

```
