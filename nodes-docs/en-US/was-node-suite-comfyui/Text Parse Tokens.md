# Text Parse Tokens
## Documentation
- Class name: `Text Parse Tokens`
- Category: `WAS Suite/Text/Tokens`
- Output node: `False`

The node is designed to parse and replace tokens within a given text. It utilizes a custom token parsing mechanism to identify and substitute predefined tokens with their corresponding values, facilitating dynamic text manipulation.
## Input types
### Required
- **`text`**
    - The input text to be parsed for tokens. This parameter is crucial as it provides the content within which tokens are to be identified and replaced, directly influencing the node's output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The output is the text after token parsing and replacement. This reflects the transformed text with all predefined tokens substituted with their corresponding values.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Text_Parse_Tokens:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "text": (TEXT_TYPE, {"forceInput": (True if TEXT_TYPE == 'STRING' else False)}),
            }
        }

    RETURN_TYPES = (TEXT_TYPE,)
    FUNCTION = "text_parse_tokens"

    CATEGORY = "WAS Suite/Text/Tokens"

    def text_parse_tokens(self, text):
        # Token Parser
        tokens = TextTokens()
        return (tokens.parseTokens(text), )

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("NaN")

```
