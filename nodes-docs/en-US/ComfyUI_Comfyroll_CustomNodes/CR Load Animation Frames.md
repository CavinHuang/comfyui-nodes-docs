---
tags:
- Animation
- Image
---

# ⌨️ CR Load Animation Frames
## Documentation
- Class name: `CR Load Animation Frames`
- Category: `🧩 Comfyroll Studio/🎥 Animation/⌨️ IO`
- Output node: `False`

This node is designed to load a sequence of animation frames from a specified directory, facilitating the processing and manipulation of animation data within a workflow.
## Input types
### Required
- **`image_sequence_folder`**
    - Specifies the directory containing the sequence of image folders to be loaded. Each folder represents a sequence of animation frames.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`start_index`**
    - The index of the first frame to load from the sequence, allowing for control over the starting point of the animation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`max_frames`**
    - The maximum number of frames to load from the sequence, enabling limitation on the amount of data processed.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The loaded sequence of animation frames, ready for further processing.
    - Python dtype: `List[Image]`
- **`show_help`**
    - Comfy dtype: `STRING`
    - A string providing additional help or instructions related to the node's operation.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CR_LoadAnimationFrames:
    #input_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.realpath(__file__)))), 'input')
    input_dir = folder_paths.input_directory
    #print(f"CR_LoadAnimationFrames: input directory {input_dir}")
    @classmethod
    def INPUT_TYPES(s):
        #if not os.path.exists(s.input_dir):
            #os.makedirs(s.input_dir)
        image_folder = [name for name in os.listdir(s.input_dir) if os.path.isdir(os.path.join(s.input_dir,name)) and len(os.listdir(os.path.join(s.input_dir,name))) != 0]
        return {"required":
                    {"image_sequence_folder": (sorted(image_folder), ),
                     "start_index": ("INT", {"default": 1, "min": 1, "max": 10000}),
                     "max_frames": ("INT", {"default": 1, "min": 1, "max": 10000})
                     }
                }

    RETURN_TYPES = ("IMAGE", "STRING", )
    RETURN_NAMES = ("IMAGE", "show_help", )
    FUNCTION = "load_image_sequence"
    CATEGORY = icons.get("Comfyroll/Animation/IO")

    def load_image_sequence(self, image_sequence_folder, start_index, max_frames):
        image_path = os.path.join(self.input_dir, image_sequence_folder)
        file_list = sorted(os.listdir(image_path), key=lambda s: sum(((s, int(n)) for s, n in re.findall(r'(\D+)(\d+)', 'a%s0' % s)), ()))
        sample_frames = []
        sample_frames_mask = []
        sample_index = list(range(start_index-1, len(file_list), 1))[:max_frames]
        for num in sample_index:
            i = Image.open(os.path.join(image_path, file_list[num]))
            image = i.convert("RGB")
            image = np.array(image).astype(np.float32) / 255.0
            image = torch.from_numpy(image)[None,]
            image = image.squeeze()
            sample_frames.append(image)
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/IO-Nodes#cr-load-animation-frames"                        
        return (torch.stack(sample_frames), show_help, )

```
