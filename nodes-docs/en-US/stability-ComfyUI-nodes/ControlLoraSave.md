---
tags:
- LoRA
---

# ControlLoraSave
## Documentation
- Class name: `ControlLoraSave`
- Category: `stability/controlnet`
- Output node: `True`

The ControlLoraSave node is designed to save the modified state of a model and its control network to a file, incorporating LoRA (Low-Rank Adaptation) adjustments. This process involves extracting and storing LoRA parameters from the model's and control network's state dictionaries, and saving them in a specified output directory.
## Input types
### Required
- **`model`**
    - The model parameter represents the neural network model whose state is to be saved with LoRA adjustments. It is crucial for capturing the model's current configuration and modifications.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`control_net`**
    - The control_net parameter signifies the control network associated with the model, which is essential for extracting and applying LoRA adjustments to the model's parameters.
    - Comfy dtype: `CONTROL_NET`
    - Python dtype: `ControlNet`
- **`filename_prefix`**
    - The filename_prefix parameter specifies the prefix for the output file names, allowing for organized storage and easy identification of saved models.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`rank`**
    - The rank parameter determines the rank of the LoRA adjustments, influencing the granularity and extent of modifications applied to the model's parameters.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ControlLoraSave:
    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()

    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "model": ("MODEL",),
                              "control_net": ("CONTROL_NET",),
                              "filename_prefix": ("STRING", {"default": "controlnet_loras/ComfyUI_control_lora"}),
                              "rank": ("INT", {"default": 64, "min": 0, "max": 1024, "step": 8}),
                            },}
    RETURN_TYPES = ()
    FUNCTION = "save"
    OUTPUT_NODE = True

    CATEGORY = "stability/controlnet"

    def save(self, model, control_net, filename_prefix, rank):
        full_output_folder, filename, counter, subfolder, filename_prefix = folder_paths.get_save_image_path(filename_prefix, self.output_dir)

        output_sd = {}
        prefix_key = "diffusion_model."
        stored = set()

        comfy.model_management.load_models_gpu([model])
        f = model.model_state_dict()
        c = control_net.control_model.state_dict()

        for k in f:
            if k.startswith(prefix_key):
                ck = k[len(prefix_key):]
                if ck not in c:
                    ck = "control_model.{}".format(ck)
                if ck in c:
                    model_weight = f[k]
                    if len(model_weight.shape) >= 2:
                        diff = c[ck].float().to(model_weight.device) - model_weight.float()
                        out = extract_lora(diff, rank)
                        name = ck
                        if name.endswith(".weight"):
                            name = name[:-len(".weight")]
                        out1_key = "{}.up".format(name)
                        out2_key = "{}.down".format(name)
                        output_sd[out1_key] = out[0].contiguous().half().cpu()
                        output_sd[out2_key] = out[1].contiguous().half().cpu()
                    else:
                        output_sd[ck] = c[ck]
                        print(ck, c[ck].shape)
                    stored.add(ck)

        for k in c:
            if k not in stored:
                output_sd[k] = c[k].half()
        output_sd["lora_controlnet"] = torch.tensor([])

        output_checkpoint = f"{filename}_{counter:05}_.safetensors"
        output_checkpoint = os.path.join(full_output_folder, output_checkpoint)

        comfy.utils.save_torch_file(output_sd, output_checkpoint, metadata=None)
        return {}

```
