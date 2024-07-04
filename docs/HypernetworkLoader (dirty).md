
# Documentation
- Class name: HypernetworkLoader (dirty)
- Category: Bmad/api/dirty loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

HypernetworkLoader节点旨在通过应用超网络补丁来动态修改给定的模型。这个过程通过整合额外的计算路径来增强模型的能力，从而实现更复杂和细致的行为。该节点专注于通过应用超网络来定制和增强模型，促进更加灵活和自适应的模型性能。

# Input types
## Required
- model
    - model参数代表将应用超网络补丁的基础模型。它对于定义增强过程的起点至关重要，因为超网络的修改是建立在这个模型之上的。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- hypernetwork_name
    - hypernetwork_name参数指定要应用于模型的超网络的名称。它决定了将集成到模型中的具体计算修改，影响其行为和性能。
    - Comfy dtype: STRING
    - Python dtype: str
- strength
    - strength参数控制超网络对模型的影响强度。它调整超网络的修改对模型行为的影响程度，允许对增强过程进行微调。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - 输出的model是输入模型的增强版本，已经通过应用的超网络补丁进行了修改。它代表了节点处理过程的最终结果，展示了模型改进后的能力和性能。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class DirtyHypernetworkLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"model": ("MODEL",),
                             "hypernetwork_name": ("STRING", {"default": ""}),
                             "strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                             }}

    RETURN_TYPES = ("MODEL",)
    FUNCTION = "load_hypernetwork"

    CATEGORY = "Bmad/api/dirty loaders"

    def load_hypernetwork(self, model, hypernetwork_name, strength):
        hypernetwork_name = DirtyLoaderUtils.find_matching_filename(
            hypernetwork_name, folder_paths.get_filename_list("hypernetworks"))

        loader = hyper.HypernetworkLoader()
        return loader.load_hypernetwork(model, hypernetwork_name, strength)

```
