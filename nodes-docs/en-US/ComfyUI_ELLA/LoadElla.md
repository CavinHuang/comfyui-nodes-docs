---
tags:
- LoRA
---

# Load ELLA Model
## Documentation
- Class name: `LoadElla`
- Category: `ella/loaders`
- Output node: `False`

The LoadElla node is designed to initialize and load the ELLA model along with a specified T5 model into the system, setting them up for further text encoding and processing tasks. It encapsulates the functionality to load model state dictionaries and configure the models for operation on the designated device and data type.
## Input types
### Required
- **`ella_model`**
    - Specifies the directory path to the ELLA model to be loaded. This path is crucial for locating and initializing the ELLA model for subsequent operations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`t5_model`**
    - Indicates the directory path to the T5 model to be loaded alongside ELLA. The T5 model is essential for text embedding processes that precede ELLA's conditioning tasks.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`ella`**
    - Comfy dtype: `ELLA`
    - Returns a dictionary containing the initialized ELLA and T5 models, ready for text encoding and processing tasks.
    - Python dtype: `Dict[str, torch.nn.Module]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LoadElla:
    def __init__(self):
        self.device = comfy.model_management.text_encoder_device()
        self.dtype = comfy.model_management.text_encoder_dtype()

    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "ella_model": (folder_paths.get_filename_list("ella"),),
                              "t5_model": (os.listdir(folder_names_and_paths["t5_model"][0][0]),),
                              }}

    RETURN_TYPES = ("ELLA",)
    FUNCTION = "load_ella"

    CATEGORY = "ella/loaders"

    def load_ella(self, ella_model, t5_model):
        t5_path = os.path.join(models_dir, 't5_model', t5_model)
        ella_path = os.path.join(models_dir, 'ella', ella_model)
        t5_model = T5TextEmbedder(t5_path).to(self.device, self.dtype)
        ella = ELLA().to(self.device, self.dtype)

        ella_state_dict = comfy.utils.load_torch_file(ella_path)

        ella.load_state_dict(ella_state_dict)

        return ({"ELLA": ella, "T5": t5_model}, )

```
