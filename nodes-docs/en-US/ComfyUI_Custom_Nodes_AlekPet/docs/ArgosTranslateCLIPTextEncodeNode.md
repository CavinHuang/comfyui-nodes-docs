# Argos Translate CLIP Text Encode Node
## Documentation
- Class name: `ArgosTranslateCLIPTextEncodeNode`
- Category: `AlekPet Nodes/conditioning`
- Output node: `False`

This node integrates translation and text encoding functionalities, leveraging the Argos Translate library for language translation and CLIP for text encoding. It supports translating text from one language to another and then encoding the translated text into a format suitable for conditioning models, facilitating multilingual text processing and analysis.
## Input types
### Required
- **`from_translate`**
    - Specifies the source language code for the translation. It determines the language from which the text will be translated, impacting the translation accuracy and the selection of target languages.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`to_translate`**
    - Defines the target language code for the translation. It affects the final language of the translated text, enabling users to convert text into a wide range of supported languages.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`text`**
    - The input text to be translated. This text is processed through translation and then encoded, serving as the primary content for subsequent operations.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`clip`**
    - A CLIP model instance used for encoding the translated text. It plays a crucial role in converting text into a format that can be utilized for conditioning, enhancing the node's utility in text analysis.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The encoded representation of the translated text, suitable for conditioning models.
    - Python dtype: `torch.Tensor`
- **`string`**
    - Comfy dtype: `STRING`
    - The translated text, providing a direct output of the translation process.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
