import io from 'socket.io-client';
import { fromEvent, Observable } from 'rxjs';

class SocketService<T> {
  private socket: SocketIOClient.Socket = {} as SocketIOClient.Socket;

  public init(url: string): SocketService<T> {
    console.debug('initiating socket service');
    this.socket = io(url);
    return this;
  }

  public send(message: T): void {
    console.debug(`emitting message: ${message}`);
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<T> {
    return fromEvent(this.socket, 'message');
  }

  public disconnect(): void {
    this.socket.disconnect();
  }
}

export default SocketService;
