---
tags:
- Checkpoint
---

# Checkpoint Hash (Mikey)
## Documentation
- Class name: `CheckpointHash`
- Category: `Mikey/Loaders`
- Output node: `False`

The CheckpointHash node is designed to generate a hash value for a given checkpoint file. This functionality is crucial for verifying the integrity of checkpoint files and ensuring that they have not been altered or corrupted. It plays a key role in maintaining the reliability and consistency of model loading processes by providing a means to track and validate checkpoint files.
## Input types
### Required
- **`ckpt_name`**
    - The 'ckpt_name' parameter specifies the name of the checkpoint file for which the hash is to be generated. It is essential for identifying the correct file within a collection of checkpoints and is a key factor in the hash generation process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`ckpt_hash`**
    - Comfy dtype: `STRING`
    - The 'ckpt_hash' output is the generated hash value of the specified checkpoint file, serving as a unique identifier and integrity verifier for the file.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CheckpointHash:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "ckpt_name": ("STRING", {"forceInput": True}),},
                "hidden": {"unique_id": "UNIQUE_ID", "extra_pnginfo": "EXTRA_PNGINFO", "prompt": "PROMPT"}}
    
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("ckpt_hash",)
    FUNCTION = "get_hash"
    CATEGORY = "Mikey/Loaders"

    def get_hash(self, ckpt_name, extra_pnginfo, prompt, unique_id):
        file_list = folder_paths.get_filename_list("checkpoints")
        matching_file = [s for s in file_list if ckpt_name in s][0]
        ckpt_path = folder_paths.get_full_path("checkpoints", matching_file)
        hash = get_file_hash(ckpt_path)
        ckpt_name = os.path.basename(ckpt_name)
        prompt.get(str(unique_id))['inputs']['output_ckpt_hash'] = hash
        prompt.get(str(unique_id))['inputs']['output_ckpt_name'] = ckpt_name
        return (get_file_hash(ckpt_path),)

```
