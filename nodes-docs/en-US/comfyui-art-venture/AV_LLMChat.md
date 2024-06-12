---
tags:
- LLM
- LLMChat
---

# LLM Chat
## Documentation
- Class name: `AV_LLMChat`
- Category: `ArtVenture/LLM`
- Output node: `False`

The AV_LLMChat node facilitates conversation generation by leveraging language model APIs. It processes a series of messages, configuration parameters, and an optional seed to produce a coherent and contextually relevant response.
## Input types
### Required
- **`messages`**
    - A list of messages that represent the conversation history. Each message has a role indicating its source (system, user, or assistant) and can include text and optionally an image. This input is crucial for maintaining context and generating relevant responses.
    - Comfy dtype: `LLM_MESSAGE`
    - Python dtype: `List[LLMMessage]`
- **`api`**
    - The API object used to communicate with a specific language model service, such as OpenAI or Claude. This parameter determines the underlying model and API settings for the response generation.
    - Comfy dtype: `LLM_API`
    - Python dtype: `LLMApi`
- **`config`**
    - Configuration settings for the language model, including the model type, maximum token count, and temperature. These settings fine-tune the generation process.
    - Comfy dtype: `LLM_CONFIG`
    - Python dtype: `LLMConfig`
- **`seed`**
    - An optional seed for deterministic output generation, ensuring reproducibility of responses.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`response`**
    - Comfy dtype: `STRING`
    - The generated text response from the language model, based on the input messages and configuration.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMChatNode:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "messages": ("LLM_MESSAGE",),
                "api": ("LLM_API",),
                "config": ("LLM_CONFIG",),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0x1FFFFFFFFFFFFF}),
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("response",)
    FUNCTION = "chat"
    CATEGORY = "ArtVenture/LLM"

    def chat(self, messages: List[LLMMessage], api: LLMApi, config: LLMConfig, seed):
        response = api.completion(messages, config, seed)
        return (response,)

```
