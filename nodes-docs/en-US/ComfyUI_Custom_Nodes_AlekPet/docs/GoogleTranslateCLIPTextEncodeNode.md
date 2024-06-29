# Google Translate CLIP Text Encode Node
## Documentation
- Class name: `GoogleTranslateCLIPTextEncodeNode`
- Category: `AlekPet Nodes/conditioning`
- Output node: `False`

This node integrates text translation and CLIP text encoding functionalities, allowing for the translation of input text from one language to another and then encoding the translated text using the CLIP model for further processing or analysis.
## Input types
### Required
- **`from_translate`**
    - Specifies the source language for translation, with an option for automatic detection or selection from a predefined list of languages. It influences the initial step of translating the input text.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Union[str, List[str]]`
- **`to_translate`**
    - Defines the target language for the translation of the input text, affecting the language into which the text will be translated.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`manual_translate`**
    - A boolean flag that determines whether the translation should be performed automatically or manually bypassed, impacting the translation process.
    - Comfy dtype: `COMBO[BOOLEAN]`
    - Python dtype: `bool`
- **`text`**
    - The input text to be translated and encoded, serving as the primary content for processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`clip`**
    - The CLIP model used for encoding the translated text, facilitating the generation of embeddings or features from the text.
    - Comfy dtype: `CLIP`
    - Python dtype: `CLIP`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - Provides the conditioning information derived from the CLIP model's encoding of the translated text, useful for downstream tasks.
    - Python dtype: `List[Tuple[torch.Tensor, Dict[str, torch.Tensor]]]`
- **`string`**
    - Comfy dtype: `STRING`
    - The translated text, representing the output of the translation process before encoding.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
