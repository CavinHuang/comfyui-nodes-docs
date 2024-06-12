# Argos Translate Text Node
## Documentation
- Class name: `ArgosTranslateTextNode`
- Category: `AlekPet Nodes/text`
- Output node: `False`

This node specializes in translating text from one language to another, leveraging the capabilities of the Argos Translate library. It is designed to provide accurate and efficient language translation, supporting a wide range of languages.
## Input types
### Required
- **`from_translate`**
    - Specifies the source language code for the translation, determining the language from which the text will be translated.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`to_translate`**
    - Defines the target language code for the translation, indicating the language into which the text will be translated.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`text`**
    - The text to be translated, provided as a string. This is the primary content that will undergo translation.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`text`**
    - Comfy dtype: `STRING`
    - The translated text, returned as a string. This output reflects the text after it has been translated from the source to the target language.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
