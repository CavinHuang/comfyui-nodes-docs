
# Documentation
- Class name: AV_VAELoader
- Category: Art Venture/Loaders
- Output node: False

AV_VAELoader节点旨在加载VAE模型，并提供可选的覆盖功能，允许用户指定替代的VAE模型进行加载。这一功能增强了Art Venture框架内模型选择和使用的灵活性。

# Input types
## Required
- vae_name
    - 要加载的VAE模型名称。除非指定了覆盖模型，否则这将作为默认加载的模型。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
## Optional
- vae_override
    - 允许指定替代的VAE模型进行加载。如果找不到指定的模型，则会加载默认或预期的VAE模型，从而提供了灵活的模型选择方法。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- vae
    - 加载完成的VAE模型，可在系统中直接使用。这个输出使得能够进行进一步的操作或使用该模型进行转换。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AVVAELoader(VAELoader):
    @classmethod
    def INPUT_TYPES(s):
        inputs = VAELoader.INPUT_TYPES()
        inputs["optional"] = {"vae_override": ("STRING", {"default": "None"})}
        return inputs

    CATEGORY = "Art Venture/Loaders"

    def load_vae(self, vae_name, vae_override="None"):
        if vae_override != "None":
            if vae_override not in folder_paths.get_filename_list("vae"):
                print(f"Warning: Not found VAE model {vae_override}. Use {vae_name} instead.")
            else:
                vae_name = vae_override

        return super().load_vae(vae_name)

```
