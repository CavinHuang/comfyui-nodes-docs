---
tags:
- LLM
- LLMChat
---

# LLM Api Config
## Documentation
- Class name: `AV_LLMApiConfig`
- Category: `ArtVenture/LLM`
- Output node: `False`

The AV_LLMApiConfig node is designed to generate configuration settings for language model APIs, specifically focusing on model selection, token limits, and temperature settings. It abstracts the complexity of configuring language models for use in various applications, providing a streamlined interface for specifying essential parameters.
## Input types
### Required
- **`model`**
    - Specifies the language model to be used, allowing selection from a predefined list of GPT and Claude models. The choice of model directly influences the behavior and capabilities of the generated language model configuration.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Union[List[str], str]`
- **`max_token`**
    - Defines the maximum number of tokens the language model can generate or process in a single request, setting a limit on the output's length.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`temperature`**
    - Controls the creativity or randomness of the language model's responses, with higher values leading to more varied outputs.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`llm_config`**
    - Comfy dtype: `LLM_CONFIG`
    - The generated configuration for the language model, encapsulating model choice, token limits, and temperature settings.
    - Python dtype: `LLMConfig`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMApiConfigNode:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "model": (gpt_models + claude_models, {"default": gpt_vision_models[0]}),
                "max_token": ("INT", {"default": 1024}),
                "temperature": ("FLOAT", {"default": 0, "min": 0, "max": 1.0, "step": 0.001}),
            }
        }

    RETURN_TYPES = ("LLM_CONFIG",)
    RETURN_NAMES = ("llm_config",)
    FUNCTION = "make_config"
    CATEGORY = "ArtVenture/LLM"

    def make_config(self, max_token, model, temperature):
        return (LLMConfig(model=model, max_token=max_token, temperature=temperature),)

```
