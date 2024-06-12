# Text Add Tokens
## Documentation
- Class name: `Text Add Tokens`
- Category: `WAS Suite/Text/Tokens`
- Output node: `True`

This node is designed to add custom tokens and their corresponding values to a text processing system, optionally printing the current set of tokens for verification or debugging purposes.
## Input types
### Required
- **`tokens`**
    - Specifies the tokens and their values to be added, formatted as a string where each token and its value are separated by a colon. This allows for dynamic customization of token-based text processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`print_current_tokens`**
    - A flag to indicate whether the current set of custom tokens should be printed, aiding in debugging or verification of the tokens currently in use.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Text_Add_Tokens:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "tokens": ("STRING", {"default": "[hello]: world", "multiline": True}),
                "print_current_tokens": (["false", "true"],),
            }
        }

    RETURN_TYPES = ()
    FUNCTION = "text_add_tokens"
    OUTPUT_NODE = True
    CATEGORY = "WAS Suite/Text/Tokens"

    def text_add_tokens(self, tokens, print_current_tokens="false"):

        import io

        # Token Parser
        tk = TextTokens()

        # Parse out Tokens
        for line in io.StringIO(tokens):
            parts = line.split(':')
            token = parts[0].strip()
            token_value = parts[1].strip()
            tk.addToken(token, token_value)

        # Current Tokens
        if print_current_tokens == "true":
            cstr(f'Current Custom Tokens:').msg.print()
            print(json.dumps(tk.custom_tokens, indent=4))

        return tokens

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        return float("NaN")

```
