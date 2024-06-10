---
tags:
- Model
---

# 🔧 Compile Model
## Documentation
- Class name: `ModelCompile+`
- Category: `essentials`
- Output node: `False`

The ModelCompile node is designed to optimize and compile PyTorch models for improved execution performance. It allows for dynamic compilation with options for full graph compilation and various optimization modes, aiming to enhance model efficiency and runtime.
## Input types
### Required
- **`model`**
    - The PyTorch model to be compiled. This parameter is crucial as it determines the model that will undergo optimization and compilation for enhanced performance.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`fullgraph`**
    - A boolean flag indicating whether to compile the entire computational graph of the model. Enabling this can potentially improve performance by optimizing the model's execution as a whole.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`dynamic`**
    - A boolean flag that enables dynamic compilation of the model. This allows for more flexible optimizations based on the model's runtime behavior.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`mode`**
    - Specifies the compilation mode, which can range from default settings to modes focused on reducing overhead or maximizing autotuning, with or without CUDA graphs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The optimized and compiled PyTorch model, ready for improved execution.
    - Python dtype: `torch.nn.Module`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ModelCompile():
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "fullgraph": ("BOOLEAN", { "default": False }),
                "dynamic": ("BOOLEAN", { "default": False }),
                "mode": (["default", "reduce-overhead", "max-autotune", "max-autotune-no-cudagraphs"],),
            },
        }

    RETURN_TYPES = ("MODEL", )
    FUNCTION = "execute"
    CATEGORY = "essentials"

    def execute(self, model, fullgraph, dynamic, mode):
        work_model = model.clone()
        torch._dynamo.config.suppress_errors = True
        work_model.model.diffusion_model = torch.compile(work_model.model.diffusion_model, dynamic=dynamic, fullgraph=fullgraph, mode=mode)
        return( work_model, )

```
