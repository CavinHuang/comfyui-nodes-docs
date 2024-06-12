---
tags:
- CLIP
- CLIPConditioning
- Conditioning
---

# Deep Translator CLIP Text Encode Node
## Documentation
- Class name: `DeepTranslatorCLIPTextEncodeNode`
- Category: `AlekPet Nodes/conditioning`
- Output node: `False`

This node is designed to integrate translation services with CLIP text encoding, facilitating the translation of text inputs into different languages and subsequently encoding these translations into a format suitable for conditioning models. It serves as a foundational component for nodes that require both translation and text encoding capabilities, streamlining the process of preparing text for various AI-driven applications.
## Input types
### Required
- **`from_translate`**
    - Specifies the source language for translation, supporting a dynamic range of languages based on the selected translation service. It plays a crucial role in determining the initial language of the text to be translated.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`to_translate`**
    - Defines the target language for the translation, allowing for the conversion of text into a wide variety of languages as supported by the chosen translation service. This parameter is essential for specifying the desired output language of the translation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`add_proxies`**
    - Indicates whether proxy usage is enabled or disabled for the translation service, affecting how the translation requests are sent.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`proxies`**
    - Provides the proxy settings to be used if proxy usage is enabled, facilitating the translation requests through specified proxy servers.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`auth_data`**
    - Contains authorization data required by some translation services, ensuring secure access to the translation features.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`service`**
    - Specifies the translation service to be used, allowing for the selection among various supported translation providers.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`text`**
    - The text input to be translated and encoded. This parameter is central to the node's functionality, serving as the content that undergoes translation and subsequent text encoding.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`clip`**
    - A CLIP model instance used for encoding the translated text into a format that is compatible with conditioning models. This parameter is key for integrating the translation output with downstream AI processes.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The encoded representation of the translated text, formatted for use in conditioning models. This output is crucial for applications requiring text input to be in a specific encoded format.
    - Python dtype: `List[Dict[str, torch.Tensor]]`
- **`string`**
    - Comfy dtype: `STRING`
    - The translated text, providing the direct output of the translation process. This output is essential for understanding or further processing the translated content.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
