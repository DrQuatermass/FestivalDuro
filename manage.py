#!/usr/bin/env python
"""Utility da riga di comando di Django per attività amministrative."""
import os
import sys


def main():
    """Esegue attività amministrative."""
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.dev")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Non riesco a importare Django. Sei sicuro che sia installato e "
            "disponibile nella PYTHONPATH? Hai dimenticato di attivare un "
            "ambiente virtuale?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
