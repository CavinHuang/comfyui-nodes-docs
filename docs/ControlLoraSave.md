
# Documentation
- Class name: ControlLoraSave
- Category: stability/controlnet
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ControlLoraSave节点设计用于将模型及其控制网络的修改状态保存到文件中，同时融入LoRA（低秩适应）调整。这个过程涉及从模型和控制网络的状态字典中提取并存储LoRA参数，然后将其保存到指定的输出目录中。

# Input types
## Required
- model
    - model参数代表需要保存状态的神经网络模型，该模型已经过LoRA调整。它对于捕获模型的当前配置和修改至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- control_net
    - control_net参数表示与模型相关联的控制网络，它对于提取和应用LoRA调整到模型参数中至关重要。
    - Comfy dtype: CONTROL_NET
    - Python dtype: ControlNet
- filename_prefix
    - filename_prefix参数指定输出文件名的前缀，允许有组织地存储和轻松识别保存的模型。
    - Comfy dtype: STRING
    - Python dtype: str
- rank
    - rank参数决定了LoRA调整的秩，影响应用于模型参数的修改的粒度和程度。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
该节点没有输出类型


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
