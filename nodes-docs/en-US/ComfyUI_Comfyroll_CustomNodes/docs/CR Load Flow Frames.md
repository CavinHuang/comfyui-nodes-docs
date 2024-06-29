---
tags:
- Animation
- Image
---

# ⌨️ CR Load Flow Frames
## Documentation
- Class name: `CR Load Flow Frames`
- Category: `🧩 Comfyroll Studio/🎥 Animation/⌨️ IO`
- Output node: `False`

The node is designed to load sequential image frames for animation purposes, handling the initial frame differently if no frames are skipped and preparing both the current and previous frames for further processing.
## Input types
### Required
- **`input_folder`**
    - The name of the folder from which the images will be loaded. This parameter is essential for identifying the specific directory containing the animation frames.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`sort_by`**
    - Determines the order in which the files are sorted before loading. This affects the sequence in which frames are processed and displayed.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`current_frame`**
    - Specifies the index of the current frame to be loaded, adjusting for any initial frames skipped. This index is crucial for determining the sequence of frames and ensuring the correct frame is processed next.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`skip_start_frames`**
    - Indicates the number of initial frames to skip before starting the loading process. This parameter allows for flexibility in starting the animation from a specific frame.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`input_path`**
    - An optional specific path to a directory or file to be loaded. Overrides the default path constructed from the input directory and folder name.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`file_pattern`**
    - A pattern to match specific files within the directory. This allows for filtering and loading only the files that match the given pattern.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`current_image`**
    - Comfy dtype: `IMAGE`
    - The current image frame loaded and processed for animation.
    - Python dtype: `torch.Tensor`
- **`previous_image`**
    - Comfy dtype: `IMAGE`
    - The previous image frame loaded and processed, used for comparison or reference in animation.
    - Python dtype: `torch.Tensor`
- **`current_frame`**
    - Comfy dtype: `INT`
    - The index of the current frame that has been loaded.
    - Python dtype: `int`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A URL providing additional help and documentation related to the node.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CR_LoadFlowFrames:
# based on Load Image Sequence in vid2vid and mtb
    @classmethod
    def INPUT_TYPES(s):
    
        sort_methods = ["Index", "Alphabetic"]
        #sort_methods = ["Date modified", "Alphabetic", "Index"]
        input_dir = folder_paths.input_directory

        input_folders = [name for name in os.listdir(input_dir) if os.path.isdir(os.path.join(input_dir,name)) and len(os.listdir(os.path.join(input_dir,name))) != 0]

        return {"required":
                    {"input_folder": (sorted(input_folders), ),
                     "sort_by": (sort_methods, ),
                     "current_frame": ("INT", {"default": 0, "min": 0, "max": 10000, "forceInput": True}),
                     "skip_start_frames": ("INT", {"default": 0, "min": 0, "max": 10000}),
                     },
                "optional":
                    {"input_path": ("STRING", {"default": '', "multiline": False}),
                     "file_pattern": ("STRING", {"default": '*.png', "multiline": False}),
                    } 
                }

    CATEGORY = icons.get("Comfyroll/Animation/IO")

    RETURN_TYPES = ("IMAGE", "IMAGE", "INT", "STRING", )
    RETURN_NAMES = ("current_image", "previous_image", "current_frame", "show_help", )
    FUNCTION = "load_images"

    def load_images(self, file_pattern, skip_start_frames, input_folder, sort_by, current_frame, input_path=''):
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/IO-Nodes#cr-load-flow-frames"

        input_dir = folder_paths.input_directory
        
        current_frame = current_frame + skip_start_frames
        print(f"[Info] CR Load Flow Frames: current_frame {current_frame}")
            
        if input_path != '':
            if not os.path.exists(input_path):
                print(f"[Warning] CR Load Flow Frames: The input_path `{input_path}` does not exist")
                return ("", )
            image_path = os.path.join('', input_path)
        else:
            image_path = os.path.join(input_dir, input_folder)

        print(f"[Info] CR Load Flow Frames: ComfyUI Input directory is `{image_path}`")
        
        file_list = get_files(image_path, sort_by, file_pattern) 
         
        if os.path.exists(image_path + '.DS_Store'):
            file_list.remove('.DS_Store') # For Mac users
            
        if len(file_list) == 0:
            print(f"[Warning] CR Load Flow Frames: No matching files found for loading")
            return ()
         
        remaining_files = len(file_list) - current_frame   
        print(f"[Info] CR Load Flow Frames: {remaining_files} input files remaining for processing")

        img = Image.open(os.path.join(image_path, file_list[current_frame]))
        cur_image = img.convert("RGB")
        cur_image = np.array(cur_image).astype(np.float32) / 255.0
        cur_image = torch.from_numpy(cur_image)[None,]
        print(f"[Debug] CR Load Flow Frames: Current image {file_list[current_frame]}")        

        # Load first frame as previous frame if no frames skipped
        if current_frame == 0 and skip_start_frames == 0:
            img = Image.open(os.path.join(image_path, file_list[current_frame]))
            pre_image = img.convert("RGB")
            pre_image = np.array(pre_image).astype(np.float32) / 255.0
            pre_image = torch.from_numpy(pre_image)[None,] 
            print(f"[Debug] CR Load Flow Frames: Previous image {file_list[current_frame]}")               
        else:
            img = Image.open(os.path.join(image_path, file_list[current_frame - 1]))
            pre_image = img.convert("RGB")
            pre_image = np.array(pre_image).astype(np.float32) / 255.0
            pre_image = torch.from_numpy(pre_image)[None,] 
            print(f"[Debug] CR Load Flow Frames: Previous image {file_list[current_frame - 1]}")            

        return (cur_image, pre_image, current_frame, show_help, )

```
