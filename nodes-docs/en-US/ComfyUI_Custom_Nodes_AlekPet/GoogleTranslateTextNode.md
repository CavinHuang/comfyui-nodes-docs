# Google Translate Text Node
## Documentation
- Class name: `GoogleTranslateTextNode`
- Category: `AlekPet Nodes/text`
- Output node: `False`

This node provides functionality for translating text from one language to another, with an option for manual translation bypass. It leverages the Google Translate API or a built-in translator, depending on configuration, to perform the translation.
## Input types
### Required
- **`from_translate`**
    - Specifies the source language code for the translation. If set to 'auto', the source language will be automatically detected.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`to_translate`**
    - Specifies the target language code for the translation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`manual_translate`**
    - A boolean flag that, when true, bypasses the translation process and returns the original text. Useful for manual control over the translation process.
    - Comfy dtype: `COMBO[BOOLEAN]`
    - Python dtype: `bool`
- **`text`**
    - The text to be translated. Supports multiline input.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`text`**
    - Comfy dtype: `STRING`
    - The translated text.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
