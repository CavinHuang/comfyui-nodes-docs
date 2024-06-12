# Deep Translator Text Node
## Documentation
- Class name: `DeepTranslatorTextNode`
- Category: `AlekPet Nodes/text`
- Output node: `False`

The DeepTranslatorTextNode is designed to facilitate text translation across various languages, leveraging different translation services. It abstracts the complexity of selecting and interacting with translation APIs, providing a streamlined interface for translating text with optional proxy support.
## Input types
### Required
- **`from_translate`**
    - Specifies the source language for translation, or 'auto' to enable automatic language detection based on the text content. It plays a crucial role in guiding the translation process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`to_translate`**
    - Defines the target language for the translation, determining the language into which the text will be translated.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`add_proxies`**
    - A flag indicating whether proxy settings should be applied to the translation request, enabling translations in environments with restricted internet access.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`proxies`**
    - Provides the proxy configuration details if 'add_proxies' is set to True, facilitating translation requests through specified proxy servers.
    - Comfy dtype: `STRING`
    - Python dtype: `dict`
- **`auth_data`**
    - Contains authentication data required by certain translation services, ensuring authorized access to their APIs.
    - Comfy dtype: `STRING`
    - Python dtype: `dict`
- **`service`**
    - Selects the translation service to be used, such as 'GoogleTranslator', 'MyMemoryTranslator', etc., allowing for flexibility in choosing the translation provider.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`text`**
    - The text to be translated, serving as the input for the translation process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`text`**
    - Comfy dtype: `STRING`
    - The translated text, providing the outcome of the translation process.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [PreviewTextNode](../../ComfyUI_Custom_Nodes_AlekPet/Nodes/PreviewTextNode.md)
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)



## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
