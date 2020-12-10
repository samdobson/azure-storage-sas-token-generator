import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  accountKey;
  sasToken;

  constructor() {}

  ngOnInit(): void {}

  async generateSasToken() {
    const message =
      'rl' +
      '\n' + // signedPermissions
      '2020-12-09T14:00:00Z' +
      '\n' + // signedStart
      '2020-12-10T14:00:00Z' +
      '\n' + // signedExpiry
      '/blob/sjdtest/samtest1' +
      '\n' + // canonicalizedResource
      '' +
      '\n' + // signedIdentifier
      '' +
      '\n' + // signedIP
      '' +
      '\n' + // signedProtocol
      '2020-02-10' +
      '\n' + // signedVersion
      'c' +
      '\n' + // signedResource
      '' +
      '\n' + // signedSnapshotTime
      '' +
      '\n' + // rscc
      '' +
      '\n' + // rscd
      '' +
      '\n' + // rsce
      '' +
      '\n' + // rscl
      ''; // rsct

    const getUtf8Bytes = (str) =>
      new Uint8Array([...unescape(str)].map((c) => c.charCodeAt(0)));

    const keyBytes = getUtf8Bytes(atob(this.accountKey));
    const messageBytes = getUtf8Bytes(message);

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyBytes,
      { name: 'HMAC', hash: 'SHA-256' },
      true,
      ['sign']
    );
    const sig = await crypto.subtle.sign('HMAC', cryptoKey, messageBytes);

    [...new Uint8Array(sig)]
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    this.sasToken = encodeURIComponent(
      btoa(String.fromCharCode(...new Uint8Array(sig)))
    );
  }
}
