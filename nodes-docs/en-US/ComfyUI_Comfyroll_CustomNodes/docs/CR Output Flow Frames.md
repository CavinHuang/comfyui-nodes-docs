---
tags:
- Animation
- Image
---

# ⌨️ CR Output Flow Frames
## Documentation
- Class name: `CR Output Flow Frames`
- Category: `🧩 Comfyroll Studio/🎥 Animation/⌨️ IO`
- Output node: `True`

This node is designed for saving sequences of animation frames, facilitating the output process in animation workflows by streamlining the saving of image sequences.
## Input types
### Required
- **`output_folder`**
    - Specifies the directory where the output animation frames will be saved. It is essential for defining the destination of the saved frames.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`current_image`**
    - Represents the current image frame to be saved. It is crucial for determining the specific frame that will be output at any given iteration.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`filename_prefix`**
    - A prefix added to the filename of each saved frame, aiding in the organization and identification of the output files.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`current_frame`**
    - Indicates the index of the current frame being processed. This is vital for tracking the progress of the frame saving operation and for naming the output files appropriately.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`interpolated_img`**
    - An optional parameter for providing an interpolated image frame that can be saved alongside the current frame, offering flexibility in outputting enhanced or modified frames.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[torch.Tensor]`
- **`output_path`**
    - The path where the final image will be saved. This parameter is crucial for directing the output to the correct location.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CR_OutputFlowFrames:
# based on SaveImageSequence by mtb

    def __init__(self):
        self.type = "output"

    @classmethod
    def INPUT_TYPES(cls):
    
        output_dir = folder_paths.output_directory
        output_folders = [name for name in os.listdir(output_dir) if os.path.isdir(os.path.join(output_dir,name)) and len(os.listdir(os.path.join(output_dir,name))) != 0]
    
        return {
            "required": {"output_folder": (sorted(output_folders), ),
                         "current_image": ("IMAGE", ),
                         "filename_prefix": ("STRING", {"default": "CR"}),
                         "current_frame": ("INT", {"default": 0, "min": 0, "max": 9999999, "forceInput": True}),
            },
            "optional": {"interpolated_img": ("IMAGE", ),
                         "output_path": ("STRING", {"default": '', "multiline": False}),           
            }
        }

    RETURN_TYPES = ()
    FUNCTION = "save_images"
    OUTPUT_NODE = True
    CATEGORY = icons.get("Comfyroll/Animation/IO")

    def save_images(self, output_folder, current_image, current_frame, output_path='', filename_prefix="CR", interpolated_img=None):
    
        output_dir = folder_paths.get_output_directory()  
        out_folder = os.path.join(output_dir, output_folder)
        
        if output_path != '':
            if not os.path.exists(output_path):
                print(f"[Warning] CR Output Flow Frames: The input_path `{output_path}` does not exist")
                return ("",)
            out_path = output_path     # os.path.join("", output_path)
        else:
            out_path = os.path.join(output_dir, out_folder)
        print(f"[Info] CR Output Flow Frames: Output path is `{out_path}`")
        
        if interpolated_img is not None:
        
            output_image0 = current_image[0].cpu().numpy()
            output_image1 = interpolated_img[0].cpu().numpy()
        
            img0 = Image.fromarray(np.clip(output_image0 * 255.0, 0, 255).astype(np.uint8))
            img1 = Image.fromarray(np.clip(output_image1 * 255.0, 0, 255).astype(np.uint8))
        
            output_filename0 = f"{filename_prefix}_{current_frame:05}_0.png"
            output_filename1 = f"{filename_prefix}_{current_frame:05}_1.png"
            print(f"[Warning] CR Output Flow Frames: Saved {filename_prefix}_{current_frame:05}_0.png")
            print(f"[Warning] CR Output Flow Frames: Saved {filename_prefix}_{current_frame:05}_1.png")
            
            resolved_image_path0 = out_path + "/" + output_filename0
            resolved_image_path1 = out_path + "/" + output_filename1

            img0.save(resolved_image_path0, pnginfo="", compress_level=4)
            img1.save(resolved_image_path1, pnginfo="", compress_level=4)            
        else:
            output_image0 = current_image[0].cpu().numpy()
            img0 = Image.fromarray(np.clip(output_image0 * 255.0, 0, 255).astype(np.uint8))
            output_filename0 = f"{filename_prefix}_{current_frame:05}.png"
            resolved_image_path0 = out_path + "/" + output_filename0
            img0.save(resolved_image_path0, pnginfo="", compress_level=4)
            print(f"[Info] CR Output Flow Frames: Saved {filename_prefix}_{current_frame:05}.png")

        result = {"ui": {"images": [{"filename": output_filename0,"subfolder": out_path,"type": self.type,}]}}
        
        return result

```
