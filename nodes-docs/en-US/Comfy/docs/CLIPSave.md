---
tags:
- Checkpoint
- Loader
- ModelIO
- ModelLoader
---

# CLIPSave
## Documentation
- Class name: `CLIPSave`
- Category: `advanced/model_merging`
- Output node: `True`

The CLIPSave node is designed for saving CLIP models along with additional information such as prompts and extra PNG metadata. It encapsulates the functionality to serialize and store the model's state, facilitating the preservation and sharing of model configurations and their associated creative prompts.
## Input types
### Required
- **`clip`**
    - The CLIP model to be saved. This parameter is crucial as it represents the model whose state is to be serialized and stored.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`filename_prefix`**
    - A prefix for the filename under which the model and its additional information will be saved. This parameter allows for organized storage and easy retrieval of saved models.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CLIPSave:
    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()

    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "clip": ("CLIP",),
                              "filename_prefix": ("STRING", {"default": "clip/ComfyUI"}),},
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},}
    RETURN_TYPES = ()
    FUNCTION = "save"
    OUTPUT_NODE = True

    CATEGORY = "advanced/model_merging"

    def save(self, clip, filename_prefix, prompt=None, extra_pnginfo=None):
        prompt_info = ""
        if prompt is not None:
            prompt_info = json.dumps(prompt)

        metadata = {}
        if not args.disable_metadata:
            metadata["prompt"] = prompt_info
            if extra_pnginfo is not None:
                for x in extra_pnginfo:
                    metadata[x] = json.dumps(extra_pnginfo[x])

        comfy.model_management.load_models_gpu([clip.load_model()])
        clip_sd = clip.get_sd()

        for prefix in ["clip_l.", "clip_g.", ""]:
            k = list(filter(lambda a: a.startswith(prefix), clip_sd.keys()))
            current_clip_sd = {}
            for x in k:
                current_clip_sd[x] = clip_sd.pop(x)
            if len(current_clip_sd) == 0:
                continue

            p = prefix[:-1]
            replace_prefix = {}
            filename_prefix_ = filename_prefix
            if len(p) > 0:
                filename_prefix_ = "{}_{}".format(filename_prefix_, p)
                replace_prefix[prefix] = ""
            replace_prefix["transformer."] = ""

            full_output_folder, filename, counter, subfolder, filename_prefix_ = folder_paths.get_save_image_path(filename_prefix_, self.output_dir)

            output_checkpoint = f"{filename}_{counter:05}_.safetensors"
            output_checkpoint = os.path.join(full_output_folder, output_checkpoint)

            current_clip_sd = comfy.utils.state_dict_prefix_replace(current_clip_sd, replace_prefix)

            comfy.utils.save_torch_file(current_clip_sd, output_checkpoint, metadata=metadata)
        return {}

```
